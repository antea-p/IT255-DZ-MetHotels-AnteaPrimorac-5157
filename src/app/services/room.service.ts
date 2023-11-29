import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor() {}

  getPrice(basePrice: number, numberOfNights: number, extraCost: number): number {
    return basePrice * numberOfNights + extraCost;
  }
}
