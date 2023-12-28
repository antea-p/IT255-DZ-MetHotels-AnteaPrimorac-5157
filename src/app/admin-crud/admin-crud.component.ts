import { Component, ViewChild } from '@angular/core';
import { Room } from '../models/room.model';
import { RoomFormComponent } from '../room-form/room-form.component';
import { RoomService } from '../services/room.service';

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

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.roomService.getRooms().subscribe((rooms) => {
      console.log("getRooms called by AdminCRUD");
      this.rooms = rooms;
      if (this.rooms.length > 0) {
        this.nextId = Math.max(...this.rooms.map(r => r.id)) + 1;
      }
    });
  }

  createRoom(newRoom: Room): void {
    if (this.validateRoom(newRoom)) {
      newRoom.id = this.nextId++;
      this.roomService.createRoom(newRoom).subscribe();
    } else {
      alert('Invalid room data');
    }
  }

  setRoomForEdit(room: Room): void {
    this.selectedRoom = room;
    this.roomFormComponent.setRoom(room);
  }

  updateRoom(updatedRoom: Room): void {
    this.roomService.updateRoom(updatedRoom);
    this.selectedRoom = null;
  }

  deleteRoom(id: number): void {
    console.log('AdminCRUDComponent requesting deletion of room with id:', id);
    this.roomService.deleteRoom(id);
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
