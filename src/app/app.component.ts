import { Component } from '@angular/core';
import { Room } from './room/room.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MetHotels';
  rooms: Room[] = [];
  nextId = 1; // ID prve sobe

  onRoomAdded(newRoom: Room) {
    if (this.validateRoom(newRoom)) {
      this.rooms.push({ ...newRoom, id: this.nextId });
      this.nextId++;
    } else {
      alert('Invalid room data');
    }
  }

  validateRoom(room: Room): boolean {
    return room.name.trim().length >= 3 && room.beds >= 1 && room.price >= 1;
  }
}
