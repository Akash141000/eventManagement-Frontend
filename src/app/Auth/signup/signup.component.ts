import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthType } from "../auth.service";


@Component({
    selector:"app-signup",
    templateUrl:"./signup.component.html",
    styleUrls:["./signup.component.scss"],
})
export class SignupComponent{
    signupType:AuthType = AuthType.user;

    constructor(private authService:AuthService){}

    switchType(){
        this.signupType = this.signupType === AuthType.user ?  AuthType.organiser : AuthType.user; 
    }

    signupSubmit(form:NgForm){   
        this.authService.signup(this.signupType,form.value).subscribe(result=>{
            console.log(result);
        });
    }


}