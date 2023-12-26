import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room.model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/room.state';
import { selectRoomById } from '../store/room.selectors';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  roomDetails$: Observable<Room | undefined>;

  constructor(private route: ActivatedRoute, private roomService: RoomService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getRoom();
  }

  getRoom(): void {
    const roomId = +this.route.snapshot.paramMap.get('id')!;
    console.log(`roomID: ${roomId}`);
    this.roomService.getRoom(roomId);
    this.roomDetails$ = this.store.select(selectRoomById(roomId));
    console.log("Successfully used selector!")
  }

  onClick() {
    alert("Sorry, Met Hotels doesn't accept bookings yet!")
  }
}
