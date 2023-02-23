import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuarioDTO } from '../interfaces/usuarioDto.interface';

@Injectable({
    providedIn: 'root'
  })

export class UsuarioService{

    constructor(private http:HttpClient){}

    private url:string="http://localhost:8082/usuarios"

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    getUsuarios():Observable<UsuarioDTO[]>{
        return this.http.get<UsuarioDTO[]>(this.url, this.httpOptions)
        
    }

}