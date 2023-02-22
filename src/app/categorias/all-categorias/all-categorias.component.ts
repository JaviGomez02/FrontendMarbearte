import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../interfaces/categoria.interface';
import { categoriaService } from '../../services/categoria.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-all-categorias',
  templateUrl: './all-categorias.component.html',
  styleUrls: ['./all-categorias.component.css']
})
export class AllCategoriasComponent implements OnInit{

  constructor(private categoriaService:categoriaService){}

  lista:Categoria[]=[]

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

      this.categoriaService.getCategorias()
      .subscribe({
        next: (resp)=>{
          this.lista=resp
          console.log(resp)
        },
        error: (error)=>{
          
        }
      })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
