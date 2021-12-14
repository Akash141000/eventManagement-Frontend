import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs'

interface loginBody {
  email: string;
  password: string;
}

interface signupBody{
    username:string;
    email:string;
    password:string;
    confirmPassword:string;
}

export enum AuthType{
    user="user",
    organiser="organiser",
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLogged=new Subject<boolean>();
  constructor(private http: HttpClient) {}

  login(type: AuthType, body: loginBody) {
    return this.http.post<{response:string}>(`${environment.HOST_URL}/api/auth/${type}/login`, {
      email: body.email,
      password: body.password,
    });
  }

  signup(type:AuthType,body:signupBody){
      return this.http.post<{response:string}>(`${environment.HOST_URL}/api/auth/${type}/signup`,{
          username:body.username,
          email:body.email,
          password:body.password,
          confirmPassword:body.confirmPassword,
      })
  }

  loggedIn(token:string,role:AuthType){
    localStorage.setItem('token',token);
    localStorage.setItem('role',role);
    this.isLogged.next(true);
  }

  autoLogin(){
    const token = localStorage.getItem("token")
    const authType = localStorage.getItem("role")
    if(!(token && authType)){
      return
    }
    this.http.post<{response:string}>("http://localhost:3000/auth/user/auto-login",{
      token: token,
      type:authType,
    }).subscribe(result=>{
      this.loggedIn(result.response,localStorage.getItem("role") as AuthType);
    })
  }


  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.isLogged.next(false);
  }
}
