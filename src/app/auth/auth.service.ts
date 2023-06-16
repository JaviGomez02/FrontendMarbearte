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

export class authService {

    url: string = 'https://apimarbearte-production.up.railway.app/auth'
    urlLocal: string = 'http://localhost:8082/auth'

    urlAuxLocal: string = 'http://localhost:8082/jwt'
    urlAux: string = 'https://apimarbearte-production.up.railway.app/jwt'

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };


    constructor(private http: HttpClient, private cookieService: CookieService) {
        // this.http.get(this.urlAux)
        //     .subscribe({
        //         next: () => this.loged.next(true),
        //         error: () => this.loged.next(false)
        //     })
        if (localStorage.getItem('token')) {
            this.loged.next(true)
            if (this.decodeJwt(localStorage.getItem('token') as string).role == 'ADMIN') {
                this.admin.next(true)
            }
        }

        // this.http.get(this.urlAux+'Admin')
        //     .subscribe({
        //         next: () => this.admin.next(true),
        //         error: () => this.admin.next(false)
        //     })
    }

    private admin = new BehaviorSubject<boolean>(false);

    private loged = new BehaviorSubject<boolean>(false);

    get isAdmin() {
        return this.admin.asObservable();
    }

    get isLoged() {
        return this.loged.asObservable();
    }

    register(username: string, email: string, contrasena: string, nombre: string): Observable<boolean> {
        return this.http.post<any>(this.url + "/register", { "username": username, "contrasena": contrasena, "nombre": nombre, "email": email }, this.httpOptions)
            .pipe(switchMap(resp => {
                return of(true);
            }), catchError(error => {
                return of(false);
            })
            )
    }

    verify(code: string, username: string): Observable<boolean> {
        return this.http.get<any>('https://apimarbearte-production.up.railway.app/verify?code=' + code + '&username=' + username, this.httpOptions)
            .pipe(switchMap(resp => {
                return of(true);
            }), catchError(error => {
                return of(false);
            })
            )
    }


    login(username: string, password: string): Observable<boolean> {
        // console.log(username)
        // console.log(password)
        return this.http.post<AuthResponse>(this.url + "/login", { username, password }, this.httpOptions)
            .pipe(switchMap(token => {
                // this.cookieService.set('token', token.token)
                localStorage.setItem('token', token.token)
                localStorage.setItem('nombreUsuario', username)
                if (this.decodeJwt(token.token).role == 'ADMIN') {
                    this.admin.next(true)
                }
                this.loged.next(true)
                return of(true);
            }), catchError(error => {
                localStorage.removeItem('token')
                // this.cookieService.delete('token');
                return of(false);
            })
            )
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('nombreUsuario')
        // this.cookieService.delete('token')
        this.admin.next(false)
        this.loged.next(false)
    }

    isLoggedIn() {
        if (localStorage.getItem('token')) {
            return true
        }
        else {
            return false
        }
    }

    isAdminGuard() {
        // let token = this.cookieService.get('token')
        let token = localStorage.getItem('token')
        if (token) {
            let rol = this.decodeJwt(token).role
            if (rol == 'ADMIN') {
                return true
            }
        }
        return false
    }

    decodeJwt(jwt: string): DecodeToken {
        return jwt_decode(jwt)
    }


}