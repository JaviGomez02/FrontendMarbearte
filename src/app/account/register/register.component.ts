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

  @ViewChild('myForm') myForm!: NgForm;

  initForm = {
    username: "",
    password: "",
    email: "",
    nombre: ""
  }
  isLoggedIn!: boolean;
  
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  save(){
    console.log("enviado")
  }

  notValid(campo: string): boolean{
    return this.myForm?.controls[campo]?.invalid &&
      this.myForm?.controls[campo]?.touched
  }

  registerSubmit():void{
    console.log(this.myForm.value.username,this.myForm.value.email, this.myForm.value.password, this.myForm.value.nombre)
    this.authService.register(this.myForm.value.username,this.myForm.value.email, this.myForm.value.password, this.myForm.value.nombre )
    .subscribe({
      next: (resp) => {
        if (resp) {
          this.isLoggedIn=true;
          Swal.fire({
            icon: 'success',
            title: 'Registrado correctamente',
            text: 'Le hemos mandado un correo de verificación. Compruebe su bandeja de entrada'
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
