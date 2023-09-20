import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestsService } from '../services/requests.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private apiUrl = 'localhost:3000/api/users/login'; // Replace with your API URL
  user: string;
  password: string;
  userExist: boolean;
  userCreated: boolean;
  loginError: boolean;
  response = [];
  constructor(private rqservice: RequestsService, private router: Router) { 
    this.user = '';
    this.password = '';
    this.userExist = false;
    this.loginError = false;
    this.userCreated = false;
    this.response = [];
  }

  async login(){
    let dbuser = await this.auth()
    console.log(dbuser.user.username)
    if (dbuser.user.username) {
    console.log(dbuser.user.username)
      let user = {
        logged: true,
        id: dbuser.user._id,
        username: dbuser.user.username,
        DateSession: Date.now()
      };
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.router.navigate(['./dashboard']);
  }
  auth(): Promise<any> {
    let headers = new HttpHeaders();
    return new Promise((resolve, reject) => {
      this.rqservice.post('http://localhost:3000/api/users/login',  {
        username: this.user,
        password: this.password
    }, headers)
        .subscribe((response: any) => {
          resolve(response);
          },(error) => {
            console.error(error);
            reject(error); // Reject for errors
            if(error.error.error === "Password does not match"){
              this.loginError = true
            }
          }
        );
    });
   }

   register():Promise<any>{
    let headers = new HttpHeaders();
    return new Promise((resolve, reject) => {
      this.rqservice.post('http://localhost:3000/api/users',  {
        username: this.user,
        password: this.password,
        favorites: []
    }, headers)
        .subscribe((response: any) => {
          resolve(response);
          this.userCreated = true;
        },
        (error) => {
          console.error(error);
          reject(error); // Reject for errors
          if(error.error.type === "USER_EXIST"){
            this.userExist = true
          }
        }
        );
    });
   }
}
