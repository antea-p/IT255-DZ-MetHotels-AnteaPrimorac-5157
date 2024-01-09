import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoomService } from './room.service';
import { Store, StoreModule } from '@ngrx/store';
import { ConsoleSpy } from 'src/utils';
import { Room } from '../models/room.model';
import { roomReducer } from '../store/room.reducer';
import { setRooms } from '../store/room.actions';

fdescribe('RoomService', () => {
  let service: RoomService;
  let httpMock: HttpTestingController;
  let store: Store;
  let originalConsole, fakeConsole;

  const baseUrl = 'http://localhost:3000/rooms';
  const mockRoomsData: Room[] = [
    new Room(1, "Deluxe Suite", 2, 200, 3, true, true, false, false, "Luxurious suite with ocean view", [
      { id: "t1", title: "Welcome Drink", completed: true },
      { id: "t2", title: "Room Cleaning", completed: false }
    ]),
    new Room(2, "Standard Room", 1, 100, 1, false, false, true, false, "Cozy room for budget travelers", [])
  ];

  beforeEach(fakeAsync(() => {
    fakeConsole = new ConsoleSpy();
    originalConsole = window.console;
    (<any>window).console = fakeConsole;

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({ rooms: roomReducer }),
      ],
      providers: [RoomService]
    });
    service = TestBed.inject(RoomService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Store);

    // Inicijaliziraj stanje u storeu
    store.dispatch(setRooms({ rooms: mockRoomsData }));
    tick(); // Osiguraj da je store ažuriran

    // Odgovori na inicijalni HTP zahtjev praznim nizom
    const req = httpMock.expectOne('http://localhost:3000/rooms');
    req.flush([]);
  }));

  afterEach(() => {
    httpMock.verify();
    (<any>window).console = originalConsole;
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should correctly calculate the price', () => {
    const basePrice = 100;
    const numberOfNights = 3;
    const extraCost = 20;
    const expectedPrice = basePrice * numberOfNights + extraCost;

    const price = service.getPrice(basePrice, numberOfNights, extraCost);
    expect(price).toEqual(expectedPrice);
  });

  fit('should load initial data', () => {
    // as any - da se može pozvati privatna metoda
    (service as any).loadInitialData();

    const req = httpMock.expectOne('http://localhost:3000/rooms');
    expect(req.request.method).toEqual('GET');
    req.flush(mockRoomsData);
  });

  fit('should retrieve all rooms from the store', fakeAsync(() => {
    let rooms;
    service.getRooms().subscribe(data => rooms = data);
    store.dispatch(setRooms({ rooms: mockRoomsData }));
    tick();

    expect(rooms.length).toEqual(2);
    expect(rooms).toEqual(mockRoomsData);
  }));

  fit('should retrieve a room by ID from the store', fakeAsync(() => {
    const roomId = 1;
    let room;
    service.getRoom(roomId).subscribe(data => room = data);
    store.dispatch(setRooms({ rooms: mockRoomsData }));
    tick();

    const expectedRoom = mockRoomsData.find(r => r.id === roomId);
    expect(room).toEqual(expectedRoom);
  }));

  fit('should create a room', fakeAsync(() => {
    // Dodjela privremenog id-a, u stvarnosti će se mock json-server pobrinuti za ID
    const newRoomData = { name: 'TestRoom', beds: 1, price: 1.99, numberOfNights: 3, wifi: true, airConditioning: false, miniBar: false, sauna: false, description: "Cozy room", tasks: [] };
    const newRoom = new Room(
      0, newRoomData.name, newRoomData.beds, newRoomData.price, newRoomData.numberOfNights,
      newRoomData.wifi, newRoomData.airConditioning, newRoomData.miniBar,
      newRoomData.sauna, newRoomData.description, newRoomData.tasks
    );

    let createdRoomResponse;
    service.createRoom(newRoom).subscribe(response => {
      createdRoomResponse = response;
      // Osiguraj da odgovor sadrži očekivane podatke o sobi
      expect(createdRoomResponse).toEqual(jasmine.objectContaining({
        name: 'TestRoom',
        price: 1.99
      }));
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(jasmine.objectContaining(newRoomData));
    // Simuliraj odgovor backenda za svježe kreiranu sobu
    req.flush({ id: 3, ...newRoomData });

    tick();

    // Provjeri da je Observable 'completed'
    expect(createdRoomResponse).toBeDefined();
  }));

  fit('should update a room', fakeAsync(() => {
    const mockRoom = new Room(1, 'Updated Suite', 2, 250, 3, true, false, true, true, "Updated description", []);
    service.updateRoom(mockRoom);

    const req = httpMock.expectOne(`${baseUrl}/${mockRoom.id}`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(mockRoom);
    req.flush({ response: 'OK' });

    tick();
  }));

  fit('should delete a room', () => {
    const roomId = 1;
    service.deleteRoom(roomId);

    const req = httpMock.expectOne(`${baseUrl}/${roomId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);

    expect(fakeConsole.logs).toContain('Room deletion completed');
  });

});
