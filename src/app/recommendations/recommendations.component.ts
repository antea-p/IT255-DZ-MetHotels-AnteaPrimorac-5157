import { Component, OnInit } from '@angular/core';
import { RecommendationsService } from '../services/recommendations.service';
import { Recommendation } from '../models/recommendation.model';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
})
export class RecommendationsComponent implements OnInit {
  recommendations: Recommendation[] = [];

  constructor(private recomService: RecommendationsService) { }

  ngOnInit(): void {
    this.recomService.getRecommendations().subscribe({
      next: (data) => { this.recommendations = data; },
      error: (error) => { console.error('Error fetching recommendations', error); }
    });
  }
}
