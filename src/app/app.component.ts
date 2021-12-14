import { Component, OnInit } from '@angular/core';
import { AuthService } from './Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(private authSrv:AuthService){}

  ngOnInit(){
    this.authSrv.autoLogin();
  }
}
