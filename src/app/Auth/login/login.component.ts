import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthType } from "../auth.service";
import { MsalService,MsalBroadcastService } from "@azure/msal-angular";
import { EventMessage, EventType } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from "rxjs";



@Component({
    selector:"app-login",
    templateUrl:"./login.component.html",
    styleUrls:["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy{
  private readonly _destroying$ = new Subject<void>();
    logginType:AuthType = AuthType.user;

    constructor(private authSrv:AuthService,private msalSrv:MsalService,private broadcastService:MsalBroadcastService){}

    ngOnInit() {
      this.broadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        // Do something with event payload here
        console.log('onInIt',result);
      });
    }

    ngOnDestroy(): void {
      this._destroying$.next(undefined);
      this._destroying$.complete();
    }

    switchType(){
        this.logginType = this.logginType === AuthType.user ?  AuthType.organiser : AuthType.user; 
    }

    loginSubmit(form:NgForm){
       this.authSrv.login(this.logginType,form.value).subscribe((result)=>{
           this.authSrv.loggedIn(result.response,this.logginType);
    });
    }


    msalLogin(){
        this.msalSrv.loginPopup()
          .subscribe({
            next: (result) => {
              console.log('popup',result);
            },
            error: (error) => console.log(error)
          });
    }
}