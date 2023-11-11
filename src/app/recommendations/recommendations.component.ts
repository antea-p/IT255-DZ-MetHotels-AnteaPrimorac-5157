import { Component } from '@angular/core';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
})
export class RecommendationsComponent {
  recommendations = [
    {
      title: 'Gourmet Adventure',
      description:
        'Tantalize your taste buds with our award-winning cuisine. Warning: May cause drooling!',
    },
    {
      title: 'City Safari',
      description:
        'Explore the urban jungle with our exclusive city tours. Keep your eyes peeled for the wild local life!',
    },
  ];
}
