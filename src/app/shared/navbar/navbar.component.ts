import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  search:boolean = false;
  cart:boolean = false;
  color:string = 'white';

  showSearchBar():void{
    this.search = !this.search;
    if(this.color==='white')
      this.color= 'black';
    else
    this.color= 'white';
  }

  showCart():void{
    this.cart = !this.cart
  }

}
