import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Room } from '../models/room.model';
import { AppState } from '../store/room.state';
import { Store } from '@ngrx/store';
import { addRoom, deleteRoom, setRooms } from '../store/room.actions';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private baseUrl = 'http://localhost:3000/rooms';

  constructor(private httpClient: HttpClient, private store: Store<AppState>) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    console.log("LoadInitialData called!")
    this.httpClient.get<Room[]>(this.baseUrl).pipe(
      map(data => data.map(this.createRoomFromObject)),
      tap(rooms => {
        console.log('Dispatching setRooms with:', rooms);
        this.store.dispatch(setRooms({ rooms }));
      })
    ).subscribe();
  }

  getPrice(basePrice: number, numberOfNights: number, extraCost: number): number {
    return basePrice * numberOfNights + extraCost;
  }

  public getRooms(): Observable<Room[]> {
    return this.httpClient.get<any[]>(this.baseUrl).pipe(
      map((data: any[]) => data.map((item: any) => this.createRoomFromObject(item))),
    );
  }

  public getRoom(id: number): void {
    this.httpClient.get<Room>(`${this.baseUrl}/${id}`).pipe(
      map(data => this.createRoomFromObject(data))
    ).subscribe(room => {
      this.store.dispatch(addRoom({ room }));
    });
  }


  public updateRoom(room: Room): Observable<Room> {
    return this.httpClient.put(`${this.baseUrl}/${room.id}`, room).pipe(
      map((data: any) => this.createRoomFromObject(data)),
    );
  }

  public deleteRoom(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this.store.dispatch(deleteRoom({ id }));
        console.log(`Store: ${this.store}`)
      })
    );
  }

  public createRoom(room: Room): Observable<Room> {
    return this.httpClient.post<Room>(this.baseUrl, room).pipe(
      map((data: any) => this.createRoomFromObject(data)),
      tap(newRoom => {
        this.store.dispatch(addRoom({ room: newRoom }));
      })
    );
  }



  createRoomFromObject(item: any): Room {
    return new Room(item.id,
      item.name,
      item.beds,
      item.price,
      item.numberOfNights,
      item.wifi,
      item.airConditioning,
      item.miniBar,
      item.sauna,
      item.description
    );
  }
}
