"use strict";(self.webpackChunkMarbearte=self.webpackChunkMarbearte||[]).push([[343],{6343:(j,_,l)=>{l.r(_),l.d(_,{ImagenesModule:()=>m});var f=l(6895),v=l(8869);function w(a,e,o,n,s,i,g){try{var p=a[i](g),h=p.value}catch(Q){return void o(Q)}p.done?e(h):Promise.resolve(h).then(n,s)}function y(a){return function(){var e=this,o=arguments;return new Promise(function(n,s){var i=a.apply(e,o);function g(h){w(i,n,s,g,p,"next",h)}function p(h){w(i,n,s,g,p,"throw",h)}g(void 0)})}}var A=l(7579),M=l(5226),r=l.n(M),t=l(4650),T=l(529),C=l(3900),c=l(9646),I=l(262);class d{constructor(e){this.http=e,this.url="https://apimarbearte-production.up.railway.app/imagen",this.urlLocal="http://localhost:8082/imagen",this.url2="https://apimarbearte-production.up.railway.app/imagen_categoria",this.urlLocal2="http://localhost:8082/imagen_categoria",this.httpOptions={headers:new T.WM({"Content-Type":"application/json"})},this.httpMultipartHeader={headers:new T.WM({"Content-Type":"multipart/form-data; boundary=<calculated when request is sent>"})}}getImagenesByProduct(e){return this.http.get(this.url+"/"+e)}deleteImagen(e){return this.http.delete(this.url+"/"+e).pipe((0,C.w)(o=>(0,c.of)(!0)),(0,I.K)(o=>(0,c.of)(!1)))}addImagen(e,o){const n=new FormData;return n.append("imagen",new Blob([JSON.stringify({})],{type:"application/json"})),n.append("file",e),this.http.post(this.url+"/"+o,n).pipe((0,C.w)(s=>(0,c.of)(!0)),(0,I.K)(s=>(0,c.of)(!1)))}getImagenesByCategoria(e){return this.http.get(this.url2+"/"+e)}deleteImagenCategoria(e){return this.http.delete(this.url2+"/"+e).pipe((0,C.w)(o=>(0,c.of)(!0)),(0,I.K)(o=>(0,c.of)(!1)))}addImagenCategoria(e,o){const n=new FormData;return n.append("imagen",new Blob([JSON.stringify({})],{type:"application/json"})),n.append("file",e),this.http.post(this.url2+"/"+o,n).pipe((0,C.w)(s=>(console.log(s),(0,c.of)(!0))),(0,I.K)(s=>(0,c.of)(!1)))}}d.\u0275fac=function(e){return new(e||d)(t.LFG(T.eN))},d.\u0275prov=t.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"});var P=l(1875),Z=l(5415),O=l(1572);function B(a,e){1&a&&t._UZ(0,"div",8)}function U(a,e){1&a&&(t.TgZ(0,"div",9),t._UZ(1,"mat-spinner"),t.qZA())}function J(a,e){1&a&&(t.TgZ(0,"p",10),t._uU(1,"No existen imagenes"),t.qZA())}function N(a,e){if(1&a){const o=t.EpF();t.TgZ(0,"tr")(1,"td"),t._UZ(2,"img",13),t.qZA(),t.TgZ(3,"td")(4,"button",14),t.NdJ("click",function(){const i=t.CHM(o).$implicit,g=t.oxw(2);return t.KtG(g.deleteImagen(i))}),t.O4$(),t.TgZ(5,"svg",15),t._UZ(6,"path",16),t.qZA(),t._uU(7," Borrar"),t.qZA()()()}if(2&a){const o=e.$implicit;t.xp6(2),t.s9C("src",o.img,t.LSH)}}function z(a,e){if(1&a&&(t.TgZ(0,"table",11)(1,"thead")(2,"tr")(3,"th"),t._uU(4,"Imagen"),t.qZA(),t.TgZ(5,"th"),t._uU(6,"Acciones"),t.qZA()()(),t.TgZ(7,"tbody"),t.YNc(8,N,8,1,"tr",12),t.qZA()()),2&a){const o=t.oxw();t.Q6J("dtOptions",o.dtOptions)("dtTrigger",o.dtTrigger),t.xp6(8),t.Q6J("ngForOf",o.lista)}}class b{constructor(e,o,n){this.servicioImagen=e,this.route=o,this.servicioCategoria=n,this.lista=[],this.loading=!1,this.nombreCategoria="",this.dtOptions={},this.dtTrigger=new A.x}ngOnInit(){this.idCategoria=this.route.snapshot.queryParams.idCategoria,this.dtOptions={pagingType:"full_numbers",pageLength:5,processing:!0},this.getCategoria(),this.getImagenes()}getImagenes(){this.loading=!0,this.servicioImagen.getImagenesByCategoria(this.idCategoria).subscribe({next:e=>{this.lista=e,this.dtTrigger.next(this.lista),this.loading=!1},error:e=>{r().fire({icon:"error",title:"Oops...",text:"Algo ha ido mal"}),this.loading=!1}})}getCategoria(){this.loading=!0,this.servicioCategoria.getCategoriaById(this.idCategoria).subscribe({next:e=>{this.categoria=e,this.nombreCategoria=e.nombre,this.loading=!1},error:e=>{r().fire({icon:"error",title:"Oops...",text:"Algo ha ido mal"}),this.loading=!1}})}ngOnDestroy(){this.dtTrigger.unsubscribe()}addImagen(){var e=this;return y(function*(){const{value:o}=yield r().fire({title:"Selecciona la imagen",input:"file",inputAttributes:{accept:"image/*","aria-label":"Upload your profile picture"}});if(o){const s=o.name,i=s.substring(s.lastIndexOf(".")+1).toLowerCase();o.size>=1048576?r().fire({icon:"error",title:"Tama\xf1o superado",text:"El archivo que intentas subir es demasiado grande"}):"jpg"===i||"jpeg"===i||"png"===i||"gif"===i||"webp"===i?(e.loading=!0,e.servicioImagen.addImagenCategoria(o,e.idCategoria).subscribe({next:g=>{r().fire("A\xf1adido!","La imagen ha sido a\xf1adida correctamente.","success").then(p=>{window.location.reload()}),e.loading=!1},error:g=>{r().fire("Oops!","Ocurri\xf3 un error inesperado.","error"),e.loading=!1}})):r().fire({icon:"error",title:"Tipo incorrecto",text:"El archivo que intentas subir no es una imagen"})}})()}deleteImagen(e){r().fire({title:"\xbfSeguro que desea borrar la imagen?",imageUrl:e.img,imageHeight:300,showCancelButton:!0,confirmButtonColor:"#d33",cancelButtonColor:"#3085d6",cancelButtonText:"Cancelar",confirmButtonText:"Si, Borrar"}).then(o=>{o.isConfirmed&&(this.loading=!0,this.servicioImagen.deleteImagenCategoria(e.id).subscribe({next:n=>{r().fire("Borrado!","La imagen ha sido borrada.","success").then(s=>{window.location.reload()}),this.loading=!1},error:n=>{r().fire("Oops!","Ocurri\xf3 un error inesperado.","error"),this.loading=!1}}))})}}b.\u0275fac=function(e){return new(e||b)(t.Y36(d),t.Y36(v.gz),t.Y36(P.n))},b.\u0275cmp=t.Xpm({type:b,selectors:[["app-categoria-imagenes"]],decls:10,vars:5,consts:[["class","overlay",4,"ngIf"],["class","spinner",4,"ngIf"],[1,"productos-home-1"],[1,"titulo-productos"],[1,"div-boton"],[1,"boton",3,"click"],["class","titulo-aux",4,"ngIf"],["class","table table-bordered table-striped table-hover","datatable","",3,"dtOptions","dtTrigger",4,"ngIf"],[1,"overlay"],[1,"spinner"],[1,"titulo-aux"],["datatable","",1,"table","table-bordered","table-striped","table-hover",3,"dtOptions","dtTrigger"],[4,"ngFor","ngForOf"],["height","200","alt","imagen",3,"src"],["type","button",1,"btn","btn-outline-danger",2,"margin-left","10px",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","16","height","16","fill","currentColor","viewBox","0 0 16 16",1,"bi","bi-trash3"],["d","M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"]],template:function(e,o){1&e&&(t.YNc(0,B,1,0,"div",0),t.YNc(1,U,2,0,"div",1),t.TgZ(2,"div",2)(3,"p",3),t._uU(4),t.qZA(),t.TgZ(5,"div",4)(6,"button",5),t.NdJ("click",function(){return o.addImagen()}),t._uU(7,"A\xf1adir nueva imagen"),t.qZA()(),t.YNc(8,J,2,0,"p",6),t.YNc(9,z,9,3,"table",7),t.qZA()),2&e&&(t.Q6J("ngIf",o.loading),t.xp6(1),t.Q6J("ngIf",o.loading),t.xp6(3),t.hij("Imagenes de la categoria: ",o.nombreCategoria,""),t.xp6(4),t.Q6J("ngIf",!o.lista.length),t.xp6(1),t.Q6J("ngIf",o.lista.length))},dependencies:[f.sg,f.O5,Z.G,O.Ou],styles:[".spinner[_ngcontent-%COMP%]{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9999}.overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;z-index:9998}.titulo-aux[_ngcontent-%COMP%]{font-size:20px;text-transform:uppercase;font-weight:700;margin-top:50px;margin-bottom:150px}.productos-home-1[_ngcontent-%COMP%]{text-align:center;margin:180px 50px 50px}.titulo-productos[_ngcontent-%COMP%]{font-size:20px;text-transform:uppercase;font-weight:700;margin-bottom:50px}.div-boton[_ngcontent-%COMP%]{text-align:left;width:100%;margin-bottom:10px}.boton[_ngcontent-%COMP%]{text-transform:uppercase;grid-area:3/1/4/3;position:relative;padding:1em 20px;color:#fff;border-color:#fff;background-color:#e75656;font-size:13px;transition:all .1s ease-out;border:solid;border-width:1px;border-radius:5px}.boton[_ngcontent-%COMP%]:hover{background-color:#cd4848}"]});var F=l(6082);function q(a,e){1&a&&t._UZ(0,"div",8)}function L(a,e){1&a&&(t.TgZ(0,"div",9),t._UZ(1,"mat-spinner"),t.qZA())}function Y(a,e){1&a&&(t.TgZ(0,"p",10),t._uU(1,"No existen imagenes"),t.qZA())}function S(a,e){if(1&a){const o=t.EpF();t.TgZ(0,"tr")(1,"td"),t._UZ(2,"img",13),t.qZA(),t.TgZ(3,"td")(4,"button",14),t.NdJ("click",function(){const i=t.CHM(o).$implicit,g=t.oxw(2);return t.KtG(g.deleteImagen(i))}),t.O4$(),t.TgZ(5,"svg",15),t._UZ(6,"path",16),t.qZA(),t._uU(7," Borrar"),t.qZA()()()}if(2&a){const o=e.$implicit;t.xp6(2),t.s9C("src",o.img,t.LSH)}}function H(a,e){if(1&a&&(t.TgZ(0,"table",11)(1,"thead")(2,"tr")(3,"th"),t._uU(4,"Imagen"),t.qZA(),t.TgZ(5,"th"),t._uU(6,"Acciones"),t.qZA()()(),t.TgZ(7,"tbody"),t.YNc(8,S,8,1,"tr",12),t.qZA()()),2&a){const o=t.oxw();t.Q6J("dtOptions",o.dtOptions)("dtTrigger",o.dtTrigger),t.xp6(8),t.Q6J("ngForOf",o.lista)}}class x{constructor(e,o,n){this.servicioImagen=e,this.route=o,this.servicioProducto=n,this.lista=[],this.loading=!1,this.nombreProducto="",this.dtOptions={},this.dtTrigger=new A.x}ngOnInit(){this.idProducto=this.route.snapshot.queryParams.idProducto,this.dtOptions={pagingType:"full_numbers",pageLength:5,processing:!0},this.getImagenes(),this.getProducto()}getProducto(){this.loading=!0,this.servicioProducto.getProducto(this.idProducto).subscribe({next:e=>{this.producto=e,this.nombreProducto=e.nombre,this.loading=!1},error:e=>{r().fire({icon:"error",title:"Oops...",text:"Algo ha ido mal"}),this.loading=!1}})}getImagenes(){this.loading=!0,this.servicioImagen.getImagenesByProduct(this.idProducto).subscribe({next:e=>{this.lista=e,this.dtTrigger.next(this.lista),this.loading=!1},error:e=>{r().fire({icon:"error",title:"Oops...",text:"Algo ha ido mal"}),this.loading=!1}})}ngOnDestroy(){this.dtTrigger.unsubscribe()}addImagen(){var e=this;return y(function*(){const{value:o}=yield r().fire({title:"Selecciona la imagen",input:"file",inputAttributes:{accept:"image/*","aria-label":"Upload your profile picture"}});if(o){const s=o.name,i=s.substring(s.lastIndexOf(".")+1).toLowerCase();o.size>=1048576?r().fire({icon:"error",title:"Tama\xf1o superado",text:"El archivo que intentas subir es demasiado grande"}):"jpg"===i||"jpeg"===i||"png"===i||"gif"===i||"webp"===i?(e.loading=!0,e.servicioImagen.addImagen(o,e.idProducto).subscribe({next:g=>{r().fire("A\xf1adido!","La imagen ha sido a\xf1adida correctamente.","success").then(p=>{window.location.reload()}),e.loading=!1},error:g=>{r().fire("Oops!","Ocurri\xf3 un error inesperado.","error"),e.loading=!1}})):r().fire({icon:"error",title:"Tipo incorrecto",text:"El archivo que intentas subir no es una imagen"})}})()}deleteImagen(e){r().fire({title:"\xbfSeguro que desea borrar la imagen?",imageUrl:e.img,imageHeight:300,showCancelButton:!0,confirmButtonColor:"#d33",cancelButtonColor:"#3085d6",cancelButtonText:"Cancelar",confirmButtonText:"Si, Borrar"}).then(o=>{o.isConfirmed&&(this.loading=!0,this.servicioImagen.deleteImagen(e.id).subscribe({next:n=>{r().fire("Borrado!","La imagen ha sido borrada.","success").then(s=>{window.location.reload()}),this.loading=!1},error:n=>{r().fire("Oops!","Ocurri\xf3 un error inesperado.","error"),this.loading=!1}}))})}}x.\u0275fac=function(e){return new(e||x)(t.Y36(d),t.Y36(v.gz),t.Y36(F._))},x.\u0275cmp=t.Xpm({type:x,selectors:[["app-datatable-imagenes"]],decls:10,vars:5,consts:[["class","overlay",4,"ngIf"],["class","spinner",4,"ngIf"],[1,"productos-home-1"],[1,"titulo-productos"],[1,"div-boton"],[1,"boton",3,"click"],["class","titulo-aux",4,"ngIf"],["class","table table-bordered table-striped table-hover","datatable","",3,"dtOptions","dtTrigger",4,"ngIf"],[1,"overlay"],[1,"spinner"],[1,"titulo-aux"],["datatable","",1,"table","table-bordered","table-striped","table-hover",3,"dtOptions","dtTrigger"],[4,"ngFor","ngForOf"],["height","200","alt","imagen",3,"src"],["type","button",1,"btn","btn-outline-danger",2,"margin-left","10px",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","16","height","16","fill","currentColor","viewBox","0 0 16 16",1,"bi","bi-trash3"],["d","M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"]],template:function(e,o){1&e&&(t.YNc(0,q,1,0,"div",0),t.YNc(1,L,2,0,"div",1),t.TgZ(2,"div",2)(3,"p",3),t._uU(4),t.qZA(),t.TgZ(5,"div",4)(6,"button",5),t.NdJ("click",function(){return o.addImagen()}),t._uU(7,"A\xf1adir nueva imagen"),t.qZA()(),t.YNc(8,Y,2,0,"p",6),t.YNc(9,H,9,3,"table",7),t.qZA()),2&e&&(t.Q6J("ngIf",o.loading),t.xp6(1),t.Q6J("ngIf",o.loading),t.xp6(3),t.hij("Imagenes del producto: ",o.nombreProducto,""),t.xp6(4),t.Q6J("ngIf",!o.lista.length),t.xp6(1),t.Q6J("ngIf",o.lista.length))},dependencies:[f.sg,f.O5,Z.G,O.Ou],styles:[".spinner[_ngcontent-%COMP%]{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9999}.overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;z-index:9998}.productos-home-1[_ngcontent-%COMP%]{text-align:center;margin:180px 50px 50px}.titulo-productos[_ngcontent-%COMP%]{font-size:20px;text-transform:uppercase;font-weight:700;margin-bottom:50px}.titulo-aux[_ngcontent-%COMP%]{font-size:20px;text-transform:uppercase;font-weight:700;margin-top:50px;margin-bottom:150px}.div-boton[_ngcontent-%COMP%]{text-align:left;width:100%;margin-bottom:10px}.boton[_ngcontent-%COMP%]{text-transform:uppercase;grid-area:3/1/4/3;position:relative;padding:1em 20px;color:#fff;border-color:#fff;background-color:#e75656;font-size:13px;transition:all .1s ease-out;border:solid;border-width:1px;border-radius:5px}.boton[_ngcontent-%COMP%]:hover{background-color:#cd4848}"]});const D=[{path:"",component:x},{path:"categoria",component:b}];class u{}u.\u0275fac=function(e){return new(e||u)},u.\u0275mod=t.oAB({type:u}),u.\u0275inj=t.cJS({imports:[v.Bz.forChild(D),v.Bz]});class m{}m.\u0275fac=function(e){return new(e||m)},m.\u0275mod=t.oAB({type:m}),m.\u0275inj=t.cJS({imports:[f.ez,u,Z.T,O.Cq]})}}]);