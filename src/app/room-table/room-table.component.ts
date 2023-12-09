import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Room } from '../room/room.model';

@Component({
  selector: 'app-room-table',
  templateUrl: './room-table.component.html',
  styleUrls: ['./room-table.component.css']
})
export class RoomTableComponent {
  @Input() rooms: Room[] = [];
  @Output() editRoom = new EventEmitter<Room>();
  @Output() deleteRoom = new EventEmitter<number>();

  onEditRoom(room: Room) {
    this.editRoom.emit(room);
  }

  onDeleteRoom(id: number) {
    this.deleteRoom.emit(id);
  }
}