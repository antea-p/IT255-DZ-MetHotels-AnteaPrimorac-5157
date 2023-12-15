import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private baseUrl = 'http://localhost:3000/offers';

  constructor(private httpClient: HttpClient) { }

  getOffers(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }
}
