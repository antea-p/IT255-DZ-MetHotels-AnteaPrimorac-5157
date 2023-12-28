import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Room } from '../models/room.model';
import { AppState } from '../store/room.state';
import { Store } from '@ngrx/store';
import { addRoom, deleteRoom, setRooms, updateRoom } from '../store/room.actions';
import { selectAllRooms, selectRoomById } from '../store/room.selectors';

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

  public getPrice(basePrice: number, numberOfNights: number, extraCost: number): number {
    return basePrice * numberOfNights + extraCost;
  }

  public getRooms(): Observable<Room[]> {
    return this.store.select(selectAllRooms);
  }

  public getRoom(id: number): Observable<Room | undefined> {
    return this.store.select(selectRoomById(id));
  }

  public updateRoom(room: Room): void {
    this.httpClient.put<any>(`${this.baseUrl}/${room.id}`, room).subscribe({
      next: (data) => {
        const updatedRoom = this.createRoomFromObject(data);
        this.store.dispatch(updateRoom({ room: updatedRoom }));
      },
      error: (error) => console.error('Error updating room:', error),
      complete: () => console.log('Room update completed')
    });
  }

  public deleteRoom(id: number): void {
    console.log('Attempting to delete room with id:', id);
    this.httpClient.delete(`${this.baseUrl}/${id}`).subscribe({
      next: () => {
        console.log('Room deleted on server, dispatching deleteRoom to store:', id);
        this.store.dispatch(deleteRoom({ id }));
      },
      error: (error) => console.error('Error deleting room:', error),
      complete: () => console.log('Room deletion completed')
    });
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
