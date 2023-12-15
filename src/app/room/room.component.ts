import {
  Component,
  OnInit,
  HostBinding,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { Room } from '../models/room.model';

@Component({
  selector: '[app-room]',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  @Input() room: Room;
  @Output() edit = new EventEmitter<Room>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.room);
  }

  onDelete() {
    this.delete.emit(this.room.id);
  }

  ngOnInit() { }
}
