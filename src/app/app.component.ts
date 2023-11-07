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

  addRoom(
    name: HTMLInputElement,
    beds: HTMLInputElement,
    price: HTMLInputElement
  ) {
    console.log(
      `Adding room name: ${name.value}, beds count: ${beds.value} and price: ${price.value}`
    );
    // + konvertira string vrijednost u number
    const newRoom = new Room(
      this.nextId,
      name.value,
      +beds.value,
      +price.value
    );
    if (this.validateRoom(newRoom)) {
      this.rooms.push(newRoom);
      this.nextId++;
      name.value = '';
      beds.value = '';
      price.value = '';
    } else {
      alert('Invalid room data');
    }
    // sprecava izvrsavanje default POST zahtjeva i time refresh stranice
    return false;
  }

  validateRoom(room: Room): boolean {
    return room.name.trim() !== '' && room.beds > 0 && room.price > 0;
  }
}
