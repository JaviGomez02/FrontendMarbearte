"use strict";(self.webpackChunkMarbearte=self.webpackChunkMarbearte||[]).push([[343],{6343:(_,w,n)=>{n.r(w),n.d(w,{ImagenesModule:()=>p});var I=n(6895),v=n(8869);function y(a,e,r,o,i,g,c){try{var b=a[g](c),m=b.value}catch(L){return void r(L)}b.done?e(m):Promise.resolve(m).then(o,i)}function O(a){return function(){var e=this,r=arguments;return new Promise(function(o,i){var g=a.apply(e,r);function c(m){y(g,o,i,c,b,"next",m)}function b(m){y(g,o,i,c,b,"throw",m)}c(void 0)})}}var A=n(7579),B=n(5226),s=n.n(B),t=n(4650),Z=n(529),C=n(3900),l=n(9646),x=n(262);class d{constructor(e){this.http=e,this.url="https://apimarbearte-production.up.railway.app/imagen",this.urlLocal="http://localhost:8082/imagen",this.url2="https://apimarbearte-production.up.railway.app/imagen_categoria",this.urlLocal2="http://localhost:8082/imagen_categoria",this.httpOptions={headers:new Z.WM({"Content-Type":"application/json"})},this.httpMultipartHeader={headers:new Z.WM({"Content-Type":"multipart/form-data; boundary=<calculated when request is sent>"})}}getImagenesByProduct(e){return this.http.get(this.url+"/"+e)}deleteImagen(e){return this.http.delete(this.url+"/"+e).pipe((0,C.w)(r=>(0,l.of)(!0)),(0,x.K)(r=>(0,l.of)(!1)))}addImagen(e,r){const o=new FormData;return o.append("imagen",new Blob([JSON.stringify({})],{type:"application/json"})),o.append("file",e),this.http.post(this.url+"/"+r,o).pipe((0,C.w)(i=>(0,l.of)(!0)),(0,x.K)(i=>(0,l.of)(!1)))}getImagenesByCategoria(e){return this.http.get(this.url2+"/"+e)}deleteImagenCategoria(e){return this.http.delete(this.url2+"/"+e).pipe((0,C.w)(r=>(0,l.of)(!0)),(0,x.K)(r=>(0,l.of)(!1)))}addImagenCategoria(e,r){const o=new FormData;return o.append("imagen",new Blob([JSON.stringify({})],{type:"application/json"})),o.append("file",e),this.http.post(this.url2+"/"+r,o).pipe((0,C.w)(i=>(console.log(i),(0,l.of)(!0))),(0,x.K)(i=>(0,l.of)(!1)))}}d.\u0275fac=function(e){return new(e||d)(t.LFG(Z.eN))},d.\u0275prov=t.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"});var M=n(1875),T=n(5415);function P(a,e){if(1&a){const r=t.EpF();t.TgZ(0,"tr")(1,"td"),t._UZ(2,"img",6),t.qZA(),t.TgZ(3,"td")(4,"button",7),t.NdJ("click",function(){const g=t.CHM(r).$implicit,c=t.oxw();return t.KtG(c.deleteImagen(g))}),t.O4$(),t.TgZ(5,"svg",8),t._UZ(6,"path",9),t.qZA(),t._uU(7," Borrar"),t.qZA()()()}if(2&a){const r=e.$implicit;t.xp6(2),t.s9C("src",r.img,t.LSH)}}class h{constructor(e,r,o){this.servicioImagen=e,this.route=r,this.servicioCategoria=o,this.lista=[],this.dtOptions={},this.dtTrigger=new A.x}ngOnInit(){this.idCategoria=this.route.snapshot.queryParams.idCategoria,this.dtOptions={pagingType:"full_numbers",pageLength:5,processing:!0},this.servicioCategoria.getCategoriaById(this.idCategoria).subscribe({next:e=>{this.categoria=e},error:e=>{}}),this.servicioImagen.getImagenesByCategoria(this.idCategoria).subscribe({next:e=>{this.lista=e,this.dtTrigger.next(this.lista)},error:e=>{}})}ngOnDestroy(){this.dtTrigger.unsubscribe()}addImagen(){var e=this;return O(function*(){const{value:r}=yield s().fire({title:"Selecciona la imagen",input:"file",inputAttributes:{accept:"image/*","aria-label":"Upload your profile picture"}});r&&e.servicioImagen.addImagenCategoria(r,e.idCategoria).subscribe({next:o=>{s().fire("A\xf1adido!","La imagen ha sido a\xf1adida correctamente.","success").then(i=>{window.location.reload()})},error:o=>{s().fire("Oops!","Ocurri\xf3 un error inesperado.","error")}})})()}deleteImagen(e){s().fire({title:"\xbfSeguro que desea borrar la imagen?",imageUrl:e.img,showCancelButton:!0,confirmButtonColor:"#d33",cancelButtonColor:"#3085d6",cancelButtonText:"Cancelar",confirmButtonText:"Si, Borrar"}).then(r=>{r.isConfirmed&&this.servicioImagen.deleteImagenCategoria(e.id).subscribe({next:o=>{s().fire("Borrado!","La imagen ha sido borrada.","success").then(i=>{window.location.reload()})},error:o=>{s().fire("Oops!","Ocurri\xf3 un error inesperado.","error")}})})}}h.\u0275fac=function(e){return new(e||h)(t.Y36(d),t.Y36(v.gz),t.Y36(M.n))},h.\u0275cmp=t.Xpm({type:h,selectors:[["app-categoria-imagenes"]],decls:15,vars:3,consts:[[1,"productos-home-1"],[1,"titulo-productos"],[1,"div-boton"],[1,"boton",3,"click"],["datatable","",1,"table","table-bordered","table-striped","table-hover",3,"dtOptions","dtTrigger"],[4,"ngFor","ngForOf"],["height","200","alt","imagen",3,"src"],["type","button",1,"btn","btn-outline-danger",2,"margin-left","10px",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","16","height","16","fill","currentColor","viewBox","0 0 16 16",1,"bi","bi-trash3"],["d","M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"]],template:function(e,r){1&e&&(t.TgZ(0,"div",0)(1,"p",1),t._uU(2,"Imagenes de la categoria:"),t.qZA(),t.TgZ(3,"div",2)(4,"button",3),t.NdJ("click",function(){return r.addImagen()}),t._uU(5,"A\xf1adir nueva imagen"),t.qZA()(),t.TgZ(6,"table",4)(7,"thead")(8,"tr")(9,"th"),t._uU(10,"Imagen"),t.qZA(),t.TgZ(11,"th"),t._uU(12,"Acciones"),t.qZA()()(),t.TgZ(13,"tbody"),t.YNc(14,P,8,1,"tr",5),t.qZA()()()),2&e&&(t.xp6(6),t.Q6J("dtOptions",r.dtOptions)("dtTrigger",r.dtTrigger),t.xp6(8),t.Q6J("ngForOf",r.lista))},dependencies:[I.sg,T.G],styles:[".productos-home-1[_ngcontent-%COMP%]{text-align:center;margin:180px 50px 50px}.titulo-productos[_ngcontent-%COMP%]{font-size:20px;text-transform:uppercase;font-weight:700;margin-bottom:50px}.div-boton[_ngcontent-%COMP%]{text-align:left;width:100%;margin-bottom:10px}.boton[_ngcontent-%COMP%]{text-transform:uppercase;grid-area:3/1/4/3;position:relative;padding:1em 20px;color:#fff;border-color:#fff;background-color:#e75656;font-size:13px;transition:all .1s ease-out;border:solid;border-width:1px;border-radius:5px}.boton[_ngcontent-%COMP%]:hover{background-color:#cd4848}"]});var F=n(6082);function U(a,e){if(1&a){const r=t.EpF();t.TgZ(0,"tr")(1,"td"),t._UZ(2,"img",6),t.qZA(),t.TgZ(3,"td")(4,"button",7),t.NdJ("click",function(){const g=t.CHM(r).$implicit,c=t.oxw();return t.KtG(c.deleteImagen(g))}),t.O4$(),t.TgZ(5,"svg",8),t._UZ(6,"path",9),t.qZA(),t._uU(7," Borrar"),t.qZA()()()}if(2&a){const r=e.$implicit;t.xp6(2),t.s9C("src",r.img,t.LSH)}}class f{constructor(e,r,o){this.servicioImagen=e,this.route=r,this.servicioProducto=o,this.lista=[],this.dtOptions={},this.dtTrigger=new A.x}ngOnInit(){this.idProducto=this.route.snapshot.queryParams.idProducto,this.dtOptions={pagingType:"full_numbers",pageLength:5,processing:!0},this.servicioProducto.getProducto(this.idProducto).subscribe({next:e=>{this.producto=e},error:e=>{}}),this.servicioImagen.getImagenesByProduct(this.idProducto).subscribe({next:e=>{this.lista=e,this.dtTrigger.next(this.lista)},error:e=>{}})}ngOnDestroy(){this.dtTrigger.unsubscribe()}addImagen(){var e=this;return O(function*(){const{value:r}=yield s().fire({title:"Selecciona la imagen",input:"file",inputAttributes:{accept:"image/*","aria-label":"Upload your profile picture"}});r&&e.servicioImagen.addImagen(r,e.idProducto).subscribe({next:o=>{s().fire("A\xf1adido!","La imagen ha sido a\xf1adida correctamente.","success").then(i=>{window.location.reload()})},error:o=>{s().fire("Oops!","Ocurri\xf3 un error inesperado.","error")}})})()}deleteImagen(e){s().fire({title:"\xbfSeguro que desea borrar la imagen?",imageUrl:e.img,showCancelButton:!0,confirmButtonColor:"#d33",cancelButtonColor:"#3085d6",cancelButtonText:"Cancelar",confirmButtonText:"Si, Borrar"}).then(r=>{r.isConfirmed&&this.servicioImagen.deleteImagen(e.id).subscribe({next:o=>{s().fire("Borrado!","La imagen ha sido borrada.","success").then(i=>{window.location.reload()})},error:o=>{s().fire("Oops!","Ocurri\xf3 un error inesperado.","error")}})})}}f.\u0275fac=function(e){return new(e||f)(t.Y36(d),t.Y36(v.gz),t.Y36(F._))},f.\u0275cmp=t.Xpm({type:f,selectors:[["app-datatable-imagenes"]],decls:15,vars:3,consts:[[1,"productos-home-1"],[1,"titulo-productos"],[1,"div-boton"],[1,"boton",3,"click"],["datatable","",1,"table","table-bordered","table-striped","table-hover",3,"dtOptions","dtTrigger"],[4,"ngFor","ngForOf"],["height","200","alt","imagen",3,"src"],["type","button",1,"btn","btn-outline-danger",2,"margin-left","10px",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","16","height","16","fill","currentColor","viewBox","0 0 16 16",1,"bi","bi-trash3"],["d","M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"]],template:function(e,r){1&e&&(t.TgZ(0,"div",0)(1,"p",1),t._uU(2,"Imagenes del producto:"),t.qZA(),t.TgZ(3,"div",2)(4,"button",3),t.NdJ("click",function(){return r.addImagen()}),t._uU(5,"A\xf1adir nueva imagen"),t.qZA()(),t.TgZ(6,"table",4)(7,"thead")(8,"tr")(9,"th"),t._uU(10,"Imagen"),t.qZA(),t.TgZ(11,"th"),t._uU(12,"Acciones"),t.qZA()()(),t.TgZ(13,"tbody"),t.YNc(14,U,8,1,"tr",5),t.qZA()()()),2&e&&(t.xp6(6),t.Q6J("dtOptions",r.dtOptions)("dtTrigger",r.dtTrigger),t.xp6(8),t.Q6J("ngForOf",r.lista))},dependencies:[I.sg,T.G],styles:[".productos-home-1[_ngcontent-%COMP%]{text-align:center;margin:180px 50px 50px}.titulo-productos[_ngcontent-%COMP%]{font-size:20px;text-transform:uppercase;font-weight:700;margin-bottom:50px}.div-boton[_ngcontent-%COMP%]{text-align:left;width:100%;margin-bottom:10px}.boton[_ngcontent-%COMP%]{text-transform:uppercase;grid-area:3/1/4/3;position:relative;padding:1em 20px;color:#fff;border-color:#fff;background-color:#e75656;font-size:13px;transition:all .1s ease-out;border:solid;border-width:1px;border-radius:5px}.boton[_ngcontent-%COMP%]:hover{background-color:#cd4848}"]});const S=[{path:"",component:f},{path:"categoria",component:h}];class u{}u.\u0275fac=function(e){return new(e||u)},u.\u0275mod=t.oAB({type:u}),u.\u0275inj=t.cJS({imports:[v.Bz.forChild(S),v.Bz]});class p{}p.\u0275fac=function(e){return new(e||p)},p.\u0275mod=t.oAB({type:p}),p.\u0275inj=t.cJS({imports:[I.ez,u,T.T]})}}]);