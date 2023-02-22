import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, switchMap, catchError, BehaviorSubject } from 'rxjs';
import { AuthResponse } from '../interfaces/token.interface';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode";
import { DecodeToken } from '../interfaces/decode-token.interface';



@Injectable({
    providedIn: 'root'
  })

export class authService{

    url:string = 'http://localhost:8082/auth'
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient, private cookieService:CookieService){}


    register(username: string, email:string, contrasena:string, nombre:string):Observable<boolean>{
        return this.http.post<any>(this.url+"/register", {"username":username, "contrasena":contrasena, "nombre":nombre, "email":email},this.httpOptions)
        .pipe( switchMap(resp => {
                return of(true);
            }),catchError(error => {
                return of(false);
            })
        )
    }

    verify(code: string, username: string):Observable<boolean>{
        return this.http.get<any>('http://localhost:8082/verify?code='+code+'&username='+username, this.httpOptions)
        .pipe( switchMap(resp => {
                return of(true);
            }),catchError(error => {
                return of(false);
            })
        )
    }

    
    login(username: string, password: string):Observable<boolean>{
        // console.log(username)
        // console.log(password)
        return this.http.post<AuthResponse>(this.url+"/login", {username, password},this.httpOptions)
        .pipe( switchMap(token => {
                this.cookieService.set('token', token.token)
                return of(true);
            }),catchError(error => {
                this.cookieService.delete('token');
                return of(false);
            })
        )
    }

    logout() {
        this.cookieService.delete('token')
    }

    decodeJwt(jwt: string): DecodeToken{
        return jwt_decode(jwt)
    }



}