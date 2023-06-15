import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { authService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: authService, private route: Router) { }

  loading: boolean = false

  @ViewChild('myForm') myForm!: NgForm;

  initForm = {
    username: "",
    password: ""
  }
  isLoggedIn!: boolean;

  ngOnInit(): void {
    // this.isLoggedIn = this.authService.isAuthenticated();
    // if(this.authService.isLoggedIn()){
    //   this.route.navigateByUrl("/")
    // }
  }

  save() {
    // console.log("enviado")
  }

  notValid(campo: string): boolean {
    return this.myForm?.controls[campo]?.invalid &&
      this.myForm?.controls[campo]?.touched
  }

  // notValid(campo: string): boolean{
  //   return this.myForm?.controls[campo]?.invalid &&
  //     this.myForm?.controls[campo]?.touched
  // }

  signIn(): void {

    this.loading = true
    // console.log('Username: ', this.myForm.value.username, 'Password: ', this.myForm.value.password)
    this.authService.login(this.myForm.value.username, this.myForm.value.password)
      .subscribe({
        next: (resp) => {
          if (resp) {
            this.isLoggedIn = true;
            Swal.fire({
              icon: 'success',
              title: 'Login correcto',
              text: 'Redirigiendo a home...',
              timer: 1500
            }).then((resp) => {
              this.route.navigate(["/"])
            })
            this.loading = false
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Usuario y/o contraseña incorrectos'
            })
            this.loading = false

          }
        }
      })

  }

  logOut(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }

}
