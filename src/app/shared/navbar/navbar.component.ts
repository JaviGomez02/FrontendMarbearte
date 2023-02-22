import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { authService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  constructor(private cookieService: CookieService, private authService:authService) { }

  ngOnInit(): void {
  }


}
