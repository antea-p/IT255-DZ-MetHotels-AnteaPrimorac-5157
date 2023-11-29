import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Room } from '../room/room.model';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css'],
})
export class RoomFormComponent implements OnInit {
  // znak ! govori TS-u da ce polje sigurno biti inicijaliziran
  // prije izvrsenja bilo kakve operacije na njemu
  roomForm!: FormGroup;
  nameControl!: FormControl;

  extraCost: number = 0;

  // kod uspješnog dodavanja sobe, emitiraj roditeljskoj komponenti
  // podatke o Room objektu
  @Output() roomAdded = new EventEmitter<Room>();

  ngOnInit() {}

  constructor(private fb: FormBuilder, private roomService: RoomService) {
    this.createForm();
    this.setupValueChangesObservation();
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
    });

    this.nameControl = this.roomForm.get('name') as FormControl;
  }

  setupValueChangesObservation() {
    this.nameControl.valueChanges.subscribe((value: string) => {
      if (value.length < 6) {
        console.log('Room name has length < 6: ', value);
      }
    });

    this.roomForm.valueChanges.subscribe(() => {
      this.calculateExtraCost();
    });
  }

  calculateExtraCost() {
    this.extraCost = 0;
    if (this.roomForm.value.airConditioning) this.extraCost += 4.99;
    if (this.roomForm.value.miniBar) this.extraCost += 9.99;
    if (this.roomForm.value.sauna) this.extraCost += 19.99;
  }

  onSubmit() {
    if (this.roomForm.valid) {
      const formValue = this.roomForm.value;
      // računanje cijene primjenom metode RoomService-a
      const totalPrice = this.roomService.getPrice(formValue.price, formValue.numberOfNights, this.extraCost);
      console.log(`Called roomService.getPrice(newRoom), got ${totalPrice}`);
      const newRoom = new Room(
        0,
        formValue.name,
        formValue.beds,
        totalPrice,
        formValue.numberOfNights,
        formValue.wifi,
        formValue.airConditioning,
        formValue.miniBar,
        formValue.sauna
      );

      this.roomAdded.emit(newRoom);
      this.roomForm.reset();
    } else {
      this.markAllAsTouched();
    }
  }

  // Metoda koja omogućuje prikaz greški u slučaju da je korisnik pritisnuo
  // Add Form dugme bez prethodnog popunjavanja forme
  private markAllAsTouched() {
    Object.values(this.roomForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
