import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public login:LoginService) { }

  ngOnInit(): void {
  }
public logout()
{
  this.login.logout();
  window.location.reload();
}
}
