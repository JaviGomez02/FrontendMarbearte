import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { categoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private categoriaService:categoriaService, private route: Router) { }

  listaCategorias:Categoria[]=[]

  ngOnInit(): void {
    this.categoriaService.getCategorias()
    .subscribe({
      next: (resp)=>{
        for(let i=0; i<3; i++){
          this.listaCategorias.push(resp[i])
        }
      }
    })
  }

  verProductos(id:number){
    this.route.navigateByUrl('products/all?idCategoria='+id)
  }



}
