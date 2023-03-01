import { Component, OnInit } from '@angular/core';
import { UsuarioDTO } from '../../interfaces/usuarioDto.interface';
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-usuarios',
  templateUrl: './all-usuarios.component.html',
  styleUrls: ['./all-usuarios.component.css']
})
export class AllUsuariosComponent implements OnInit{

  lista:UsuarioDTO[]=[]
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private usuarioService:UsuarioService){}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

      this.usuarioService.getUsuarios()
      .subscribe({
        next: (resp)=>{
          this.lista=resp
          this.dtTrigger.next(this.lista)

        },
        error: (error)=>{

        }
      })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  deleteUsuario(username:string){
    Swal.fire({
      title: '¿Seguro que desea borrar el usuario '+username+'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario(username)
        .subscribe({
          next: (resp)=>{
            Swal.fire(
              'Borrado!',
              'El Usuario ha sido borrado.',
              'success'
            ).then((resp)=>{
              window.location.reload()
            })
          },
          error: (error)=>{
            Swal.fire(
              'Oops!',
              'Ocurrió un error inesperado.',
              'error'
            )
          }
        })
        
      }
    })
  }

}
