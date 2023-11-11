import { Component } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent {
  offers = [
    {
      title: 'Sleep and Eat',
      description:
        'Who said there’s no such thing as a free lunch? Stay with us and get a breakfast that’s almost as good as grandma’s!',
      validUntil: '2023-12-31',
    },
    {
      title: 'Weekend Escape',
      description:
        'Escape the ordinary! Or just escape. Either way, we’ve got a cozy bed waiting for you.',
      validUntil: '2023-11-30',
    },
  ];
}
