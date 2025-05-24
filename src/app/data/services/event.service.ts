import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventModel} from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'https://sport-match-ccc44204aa55.herokuapp.com/events'; // URL do JSON Server

  constructor(private http: HttpClient) {}

  createEvent(event: EventModel): Observable<EventModel> {
    return this.http.post<EventModel>(this.apiUrl, event);
  }

  getEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.apiUrl);
  }

  findEvents(id: string): Observable<EventModel> {
    return this.http.get<EventModel>(`${this.apiUrl}/${id}`);
  }
}
