import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Expediteur {
  id: number;
  nom: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExpediteurService {

  private apiUrl = 'http://localhost:8080/api/expediteurs';

  constructor(private http: HttpClient) {}

  getExpediteurs(): Observable<Expediteur[]> {
    return this.http.get<Expediteur[]>(this.apiUrl);
  }
}