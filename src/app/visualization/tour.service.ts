import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {ArrowModel, TourModel} from '../models/tour.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private httpClient: HttpClient) { }

  getTour(tourId: string): Observable<TourModel> {
    return this.httpClient.get<TourModel>(environment.ip + '').pipe(map(response => response));
  }

  addArrow(tourId: string, roomId: string, arrow: ArrowModel) {
    return this.httpClient.post(environment.ip + '', {tourId: tourId, roomId: roomId, arrow: arrow}).pipe(map(response => response));
  }
}
