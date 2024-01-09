import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Room } from '../models/room.model';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css'],
})
export class RoomFormComponent implements OnInit {
  roomForm: FormGroup;
  nameControl: FormControl;
  extraCost: number = 0;

  @Output() roomAdded = new EventEmitter<Room>();
  @Output() roomUpdated = new EventEmitter<Room>();
  @Input() editRoom: Room | null = null;

  constructor(private fb: FormBuilder, private roomService: RoomService) {
    this.createForm();
    this.setupValueChangesObservation();
  }

  ngOnInit() {
    this.handleEditRoom();
  }

  ngOnChanges() {
    this.handleEditRoom();
  }

  createForm() {
    this.roomForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      beds: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      price: ['', [Validators.required, Validators.min(1)]],
      numberOfNights: ['', [Validators.required, Validators.min(1)]],
      wifi: [true],
      airConditioning: [false],
      miniBar: [false],
      sauna: [false],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.nameControl = this.roomForm.get('name') as FormControl;
  }

  setRoom(room: Room) {
    this.editRoom = room;
    this.roomForm.patchValue(room);
  }

  handleEditRoom() {
    if (this.editRoom) {
      this.roomForm.patchValue(this.editRoom);
    }
  }

  setupValueChangesObservation() {
    this.nameControl.valueChanges.subscribe(value => {
      if (!value || value.length < 6) {
        console.log('Room name has length < 6: ', value);
      }
    });

    this.roomForm.valueChanges.subscribe(() => {
      this.calculateExtraCost();
    });
  }

  calculateExtraCost() {
    this.extraCost = 0;
    const values = this.roomForm.value;
    if (values.airConditioning) this.extraCost += 4.99;
    if (values.miniBar) this.extraCost += 9.99;
    if (values.sauna) this.extraCost += 19.99;
  }

  onSubmit() {
    if (this.roomForm.valid) {
      const formValue = this.roomForm.value;
      this.createRoomObject(formValue);
      this.roomForm.reset();
    } else {
      this.markAllAsTouched();
    }
  }

  createRoomObject(formValue: any) {
    // kod mijenjanja postojeće sobe, dodijeli dosadašnju cijenu, inače pozovi roomService 
    const totalPrice: number = this.editRoom ? formValue.price : this.roomService.getPrice(
      formValue.price,
      formValue.numberOfNights,
      this.extraCost
    )
    const room: Room = new Room(
      // kod mijenjanja postojeće sobe, dodijeli dosadašnji ID, inače privremeno dodijeli 0
      this.editRoom ? this.editRoom.id : 0,
      formValue.name,
      formValue.beds,
      totalPrice,
      formValue.numberOfNights,
      formValue.wifi,
      formValue.airConditioning,
      formValue.miniBar,
      formValue.sauna,
      formValue.description,
      this.editRoom?.tasks
    );

    // emitiraj roditeljskoj komponenti odgovarajući događaj
    if (this.editRoom) {
      this.roomUpdated.emit(room);
    } else {
      this.roomAdded.emit(room);
    }
  }

  markAllAsTouched() {
    Object.values(this.roomForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
