import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html',
  styleUrls: ['./update-usuario.component.css']
})
export class UpdateUsuarioComponent implements OnInit{

  constructor(private servicioUsuario:UsuarioService, private activatedRoute:ActivatedRoute){}

  usuario!:Usuario

  @ViewChild('myForm') myForm!: NgForm;

  initForm={
    username: "",
    password: "",
    email: "",
    nombre: "",
    passwordRepeat:""}

  ngOnInit(): void {
    this.servicioUsuario.getUsuarioByUsername(this.activatedRoute.snapshot.params['username'])
    .subscribe({
      next: (resp)=>{
        this.usuario=resp
        this.initForm = {
          username: resp.username,
          password: "",
          email: resp.email,
          nombre: resp.nombre,
          passwordRepeat:""
        }
        console.log(resp)
      }
    })
  }

  notValid(campo: string): boolean{
    return this.myForm?.controls[campo]?.invalid &&
      this.myForm?.controls[campo]?.touched
  }

  updateUsuario(){
    this.servicioUsuario.updateUsuario(this.myForm.value.username, this.myForm.value.password, this.myForm.value.nombre,
      this.myForm.value.email, this.usuario.role, this.usuario.enable, this.usuario.verificationCode)
      .subscribe({
        next: (resp) => {
          if (resp) {
            Swal.fire({
              icon: 'success',
              title: 'Actualizado correctamente',
              text: 'Sus datos han sido actualizado correctamente'
            })
            
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo ha ido mal. Inténtelo de nuevo'
            })
          }
        }
      })
  }

}
