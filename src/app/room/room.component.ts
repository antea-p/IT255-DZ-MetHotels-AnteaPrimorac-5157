import {
  Component,
  OnInit,
  HostBinding,
  Input, // dodato je ovo
} from '@angular/core';
import { Room } from './room.model';

@Component({
  selector: '[app-room]',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  @Input() room!: Room;

  constructor() {}

  ngOnInit() {}
}
