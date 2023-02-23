import { Component, OnInit } from '@angular/core';
import { UsuarioDTO } from '../../interfaces/usuarioDto.interface';
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';

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
        },
        error: (error)=>{

        }
      })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
