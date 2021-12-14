import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../Auth/auth.service";

@Component({
        selector:"app-header",
        templateUrl:"./header.component.html",
        styleUrls:["./header.component.scss"],
})
export class HeaderComponent implements OnInit,OnDestroy{ 
        private isLoggedSub:Subscription | undefined;
        isLogged:boolean = false;
        constructor(private authSrv:AuthService){
        }
        ngOnInit(){
                this.isLoggedSub= this.authSrv.isLogged.subscribe(result=>this.isLogged = result)
        }

        ngOnDestroy(){
                if(this.isLoggedSub){
                this.isLoggedSub.unsubscribe();
                }
        }


        logout(){
                this.authSrv.logOut();
        }


}