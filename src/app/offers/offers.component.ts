import { Component, OnInit } from '@angular/core';
import { OffersService } from '../services/offers.service';
import { Offer } from '../models/offer.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
  offers: Offer[] = [];

  constructor(private offersService: OffersService) { }

  ngOnInit(): void {
    this.offersService.getOffers().subscribe({
      next: (data) => { this.offers = data; },
      error: (error) => { console.error('Error fetching offers', error); }
    });

  }
}
