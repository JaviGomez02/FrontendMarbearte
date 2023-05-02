import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Color, Colore } from '../interfaces/page.interface';

@Injectable({
  providedIn: 'root'
})

export class colorService {

  url: string = 'https://apimarbearte-production.up.railway.app/color'
  urlLocal:string='http://localhost:8082/color'

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  getColores(): Observable<Color[]> {
    return this.http.get<Color[]>(this.urlLocal)
  }
  getColorById(id: string): Observable<Colore> {
    return this.http.get<Colore>(this.urlLocal + '/' + id)
  }

}