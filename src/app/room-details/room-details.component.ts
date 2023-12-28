import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  roomDetails$: Observable<Room | undefined>;

  constructor(private route: ActivatedRoute, private roomService: RoomService) { }

  ngOnInit(): void {
    this.getRoom();
  }

  getRoom(): void {
    const roomId = +this.route.snapshot.paramMap.get('id')!;
    console.log(`Fetching details for roomID: ${roomId}`);
    this.roomDetails$ = this.roomService.getRoom(roomId);

    this.roomDetails$.subscribe(room => {
      if (room) {
        console.log('Array of tasks:', room.tasks);
      }
    });
  }

  markTaskAsComplete(taskId: string): void {
    console.log(`Marking task ${taskId} as complete`);
    // TODO: Dispatch an NgRx action to mark the task as complete
  }

  markTaskAsIncomplete(taskId: string): void {
    console.log(`Marking task ${taskId} as incomplete`);
    // TODO: Dispatch an NgRx action to mark the task as incomplete
  }


  onClick(): void {
    alert("Sorry, Met Hotels doesn't accept bookings yet!")
  }
}
