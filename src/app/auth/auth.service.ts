import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { AuthResponse } from '../interfaces/token.interface';


@Injectable({
    providedIn: 'root'
  })

export class authService{

    url:string = 'http://localhost:8082/auth/login'
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient){}

    
    login(username: string, password: string):Observable<boolean>{
        console.log(username)
        console.log(password)
        return this.http.post<AuthResponse>(this.url, {username, password},this.httpOptions)
        .pipe( switchMap(token => {
                localStorage.setItem('token', token.token);
                return of(true);
            }),catchError(error => {
                localStorage.removeItem('token');
                return of(false);
            })
        )
    }

    logout() {
        localStorage.setItem('authenticated', 'false');
        localStorage.removeItem('rol'); 
    }

    isAuthenticated() {
        return localStorage.getItem('authenticated')==='true'
    }
}