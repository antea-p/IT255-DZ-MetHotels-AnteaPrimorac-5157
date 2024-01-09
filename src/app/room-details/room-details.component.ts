import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room.model';
import { Observable, filter, take, tap } from 'rxjs';
import { Task } from '../models/task.model';

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
    this.roomDetails$ = this.roomService.getRoom(roomId).pipe(
      tap(room => {
        if (room) {
          console.log('Array of tasks:', room.tasks);
        }
      })
    );
  }

  toggleTaskStatus(task: Task): void {
    this.roomDetails$.pipe(
      take(1),
      filter(Boolean) // Ensure the room is not undefined
    ).subscribe(roomDetails => {
      const updatedTasks = roomDetails.tasks.map(t =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      );
      const updatedRoom = { ...roomDetails, tasks: updatedTasks };
      this.roomService.updateRoom(updatedRoom);
    });
  }

  addNewTask(title: string): void {
    if (!title) {
      alert('Task title cannot be empty.');
      return;
    }
    this.roomDetails$.pipe(
      take(1),
      filter(Boolean) // Ensure the room is not undefined
    ).subscribe(roomDetails => {
      const newTask: Task = {
        id: this.generateTaskId(), // A method to generate a unique task ID
        title,
        completed: false
      };
      const updatedRoom = {
        ...roomDetails,
        tasks: [...roomDetails.tasks, newTask]
      };
      this.roomService.updateRoom(updatedRoom);
    });
  }

  deleteTask(taskId: string): void {
    this.roomDetails$.pipe(
      take(1),
      filter(Boolean) // Ensure the room is not undefined
    ).subscribe(roomDetails => {
      const updatedTasks = roomDetails.tasks.filter(task => task.id !== taskId);
      const updatedRoom = { ...roomDetails, tasks: updatedTasks };
      this.roomService.updateRoom(updatedRoom);
    });
  }

  private generateTaskId(): string {
    return Math.random().toString(36).substring(2, 9);
  }


  onClick(): void {
    alert("Sorry, Met Hotels doesn't accept bookings yet!")
  }
}
