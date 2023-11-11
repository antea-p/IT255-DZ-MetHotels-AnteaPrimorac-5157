import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent {
  hotelName: string = 'MetHotel';
  foundedYear: number = 2005;
  mission: string =
    'Here to make your stay so good, you won’t want to leave (but please do, we have other guests too)!';
  vision: string =
    'Aiming to be the only hotel that pops into your mind, and not just because of our complimentary cookies!';
  values: string[] = [
    'Integrity: We promise to find your lost socks.',
    'Innovation: Our rooms have doors... and windows!',
    'Excellence: Our beds are so comfy, you might miss your checkout.',
  ];
}
