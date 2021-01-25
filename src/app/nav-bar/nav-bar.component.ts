import { AuthenticationService } from './../authentication.service';

import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public authService: AuthenticationService, private router: Router) {
  }


  ngOnInit() {
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }

}
