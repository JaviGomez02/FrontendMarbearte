import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, switchMap } from 'rxjs';
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
    return this.http.get<Color[]>(this.url)
  }
  getColorById(id: string): Observable<Color> {
    let newId=id.slice(1)
    return this.http.get<Color>(this.url + '/' + newId)
  }

  addColor(color: string, nombre: string): Observable<boolean> {
    return this.http.post<any>(this.url, { "color": color, "nombre": nombre }, this.httpOptions)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  deleteColor(id: string): Observable<boolean> {
    return this.http.delete<any>(this.url + '/' + id)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }


}