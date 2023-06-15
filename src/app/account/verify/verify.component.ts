import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { authService } from '../../auth/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {


  constructor(private route: ActivatedRoute, private servicio:authService) { }

  loading:boolean=false;


  ngOnInit(): void {
    const code:string = (this.route.snapshot.queryParams['code'])
    const username:string=(this.route.snapshot.queryParams['username'])
    
    // console.log(code, username)

    this.verificar(code, username)
    

  }

  verificar(code:string, username:string){
    this.loading=true
    this.servicio.verify(code, username)
    .subscribe({
      next: (resp) => {
        if (resp) {
          Swal.fire({
            icon: 'success',
            title: 'Usuario verificado',
            text: 'Ya puede iniciar sesión'
          })
          this.loading=false
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha ido mal'
          })
          this.loading=false
        }
      }
    })
  }

}
