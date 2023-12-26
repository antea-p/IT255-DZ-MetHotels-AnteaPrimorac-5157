import { Component, ViewChild } from '@angular/core';
import { Room } from '../models/room.model';
import { RoomFormComponent } from '../room-form/room-form.component';
import { RoomService } from '../services/room.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/room.state';
import { selectAllRooms } from '../store/room.selectors';

@Component({
  selector: 'app-admin-crud',
  templateUrl: './admin-crud.component.html',
  styleUrls: ['./admin-crud.component.css']
})
export class AdminCRUDComponent {
  rooms: Room[] = [];
  nextId: number = 1;
  selectedRoom: Room | null = null;

  @ViewChild(RoomFormComponent)
  roomFormComponent: RoomFormComponent;

  constructor(private roomService: RoomService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(selectAllRooms).subscribe(rooms => {
      this.rooms = rooms;
      if (this.rooms.length > 0) {
        this.nextId = Math.max(...this.rooms.map(r => r.id)) + 1;
      }
    });
    this.getRooms(); // Trigger initial load of rooms
  }


  getRooms(): void {
    this.roomService.getRooms().subscribe((data) => {
      this.rooms = data;
      if (this.rooms.length > 0) {
        this.nextId = Math.max(...this.rooms.map(r => r.id)) + 1;
      }
    });
  }

  createRoom(newRoom: Room) {
    if (this.validateRoom(newRoom)) {
      newRoom.id = this.nextId++;
      this.roomService.createRoom(newRoom).subscribe();
    } else {
      alert('Invalid room data');
    }
  }


  setRoomForEdit(room: Room) {
    this.selectedRoom = room;
    this.roomFormComponent.setRoom(room);
  }

  updateRoom(updatedRoom: Room) {
    this.roomService.updateRoom(updatedRoom).subscribe(() => {
      const index = this.rooms.findIndex(r => r.id === updatedRoom.id);
      if (index !== -1) {
        this.rooms[index] = updatedRoom;
      }
      this.selectedRoom = null;
    });
  }

  deleteRoom(id: number) {
    this.roomService.deleteRoom(id).subscribe(() => {
      this.rooms = this.rooms.filter(room => room.id !== id);
    });
  }

  validateRoom(room: Room): boolean {
    return (
      room.name.trim().length >= 3 &&
      room.beds >= 1 &&
      room.price >= 1 &&
      room.numberOfNights >= 1
    );
  }
}
