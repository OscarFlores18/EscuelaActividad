import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personal } from '../models/personal';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  private apiUrl = 'http://localhost:8081/personal';

  constructor(private http: HttpClient) {}

  obtenerPersonal(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.apiUrl);
  }

  crearPersonal(personal: Personal): Observable<Personal> {
    return this.http.post<Personal>(this.apiUrl, personal);
  }
}