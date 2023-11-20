import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Room } from '../room/room.model';

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

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.setupValueChangesObservation();
  }

  createForm() {
    this.roomForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      beds: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      price: ['', [Validators.required, Validators.min(1)]],
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
       const newRoom = new Room(
        0, // temporary ID
        this.roomForm.value.name,
        this.roomForm.value.beds,
        this.roomForm.value.price,
        this.extraCost,
        this.roomForm.value.wifi,
        this.roomForm.value.airConditioning,
        this.roomForm.value.miniBar,
        this.roomForm.value.sauna
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
