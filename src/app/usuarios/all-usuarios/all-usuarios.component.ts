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
export class AllUsuariosComponent implements OnInit {

  lista: UsuarioDTO[] = []
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  loading: boolean = false
  constructor(private usuarioService: UsuarioService) { }



  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.getUsuarios()

  }

  getUsuarios() {
    this.loading = true
    this.usuarioService.getUsuarios()
      .subscribe({
        next: (resp) => {
          this.lista = resp
          this.dtTrigger.next(this.lista)
          this.loading = false
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha ido mal'
          })
          this.loading = false
        }
      })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  changeToUser(username: string) {
    Swal.fire({
      title: '¿Cambiar el rol de ' + username + ' a USER?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Actualizar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true
        this.usuarioService.changeToUser(username)
          .subscribe({
            next: (resp) => {
              Swal.fire(
                'Exito!',
                'Se ha cambiado el rol correctamente.',
                'success'
              ).then((resp) => {
                window.location.reload()
              })
              this.loading = false
            },
            error: (error) => {
              Swal.fire(
                'Oops!',
                'Ocurrió un error inesperado.',
                'error'
              )
              this.loading = false
            }
          })

      } else {
        this.loading = false
      }
    })
  }


  changeToAdmin(username: string) {
    Swal.fire({
      title: '¿Cambiar el rol de ' + username + ' a ADMIN?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Actualizar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true
        this.usuarioService.changeToAdmin(username)
          .subscribe({
            next: (resp) => {
              Swal.fire(
                'Exito!',
                'Se ha cambiado el rol correctamente.',
                'success'
              ).then((resp) => {
                window.location.reload()
              })
              this.loading = false
            },
            error: (error) => {
              Swal.fire(
                'Oops!',
                'Ocurrió un error inesperado.',
                'error'
              )
              this.loading = false
            }
          })

      }
      else {
        this.loading = false
      }
    })
  }



  deleteUsuario(username: string) {
    Swal.fire({
      title: '¿Seguro que desea borrar el usuario ' + username + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true
        this.usuarioService.deleteUsuario(username)
          .subscribe({
            next: (resp) => {
              Swal.fire(
                'Borrado!',
                'El Usuario ha sido borrado.',
                'success'
              ).then((resp) => {
                window.location.reload()
              })
              this.loading = false
            },
            error: (error) => {
              Swal.fire(
                'Oops!',
                'Ocurrió un error inesperado.',
                'error'
              )
              this.loading = false
            }
          })

      }
    })
  }

}
