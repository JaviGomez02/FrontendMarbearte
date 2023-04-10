import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuarioDTO } from '../interfaces/usuarioDto.interface';
import { CookieService } from "ngx-cookie-service";
import { Usuario } from "../interfaces/usuario.interface";

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor(private http: HttpClient, private cookies: CookieService) { }

  private url: string = "https://apimarbearte-production.up.railway.app/usuarios"
  urlLocal:string='http://localhost:8082/usuarios'


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // token=this.cookies.get('token')

  // httpOptionsToken = {
  //   headers: new HttpHeaders({ 'Authorization': 'Bearer '+this.token })
  // };

  getUsuarios(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(this.urlLocal, this.httpOptions)
  }

  getUsuarioByUsername(username: string): Observable<Usuario> {
    return this.http.get<Usuario>(this.urlLocal + "/" + username)
  }

  deleteUsuario(username: string): Observable<boolean> {
    return this.http.delete<any>(this.urlLocal + '/' + username)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  updateUsuario(username: string, contrasena: string, nombre: string, email: string, role: string, enable: boolean, verificationCode: string): Observable<boolean> {
    return this.http.put<any>(this.urlLocal + '/' + username, { "username": username, "contrasena": contrasena, "nombre": nombre, "email": email, "role": role, "enable": enable, "verificationCode": verificationCode }, this.httpOptions)
      .pipe(switchMap(resp => {
        return of(true)
      }), catchError(error => {
        return of(false)
      })
      )
  }

  changeToAdmin(username: string): Observable<boolean> {
    return this.http.put<any>(this.urlLocal + '/changeToAdmin/' + username, undefined)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  changeToUser(username: string): Observable<boolean> {
    return this.http.put<any>(this.urlLocal + '/changeToUser/' + username, undefined)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }


}