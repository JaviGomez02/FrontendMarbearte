import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authService } from '../../auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:authService) { }
  loading: boolean = false

  @ViewChild('myForm') myForm!: NgForm;

  initForm = {
    username: "",
    password: "",
    email: "",
    nombre: "",
    passwordRepeat:""
  }
  
  ngOnInit(): void {
    // this.isLoggedIn = this.authService.isAuthenticated();
  }



  notValid(campo: string): boolean{
    return this.myForm?.controls[campo]?.invalid &&
      this.myForm?.controls[campo]?.touched
  }

  registerSubmit():void{
    this.loading=true
    this.authService.register(this.myForm.value.username,this.myForm.value.email, this.myForm.value.password, this.myForm.value.nombre )
    .subscribe({
      next: (resp) => {
        if (resp) {
          Swal.fire({
            icon: 'success',
            title: 'Registrado correctamente',
            text: 'Le hemos mandado un correo de verificación. Compruebe su bandeja de entrada'
          })
          this.loading=false
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El nombre de usuario ya está en uso'
          })
          this.loading=false
        }
      }
    })

  }

}
