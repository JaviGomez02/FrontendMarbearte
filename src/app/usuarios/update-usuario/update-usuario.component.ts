import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html',
  styleUrls: ['./update-usuario.component.css']
})
export class UpdateUsuarioComponent implements OnInit{

  constructor(private servicioUsuario:UsuarioService, private activatedRoute:ActivatedRoute, private fb: FormBuilder){}

  usuario!:Usuario

  // myForm: FormGroup = this.fb.group({
  //   username: ['', [Validators.required, Validators.minLength(6)]],
  //   contrasena: [null, [Validators.required, Validators.minLength(10)]]
  // })

  ngOnInit(): void {
    this.servicioUsuario.getUsuarioByUsername(this.activatedRoute.snapshot.params['username'])
    .subscribe({
      next: (resp)=>{
        this.usuario=resp
        console.log(resp)
      }
    })
  }

}
