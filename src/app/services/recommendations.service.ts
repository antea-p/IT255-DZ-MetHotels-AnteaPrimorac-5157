import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  private baseUrl = 'http://localhost:3000/recommendations';

  constructor(private httpClient: HttpClient) { }

  getRecommendations(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }
}
