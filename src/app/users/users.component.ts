import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users: any
  constructor(private rqservice: RequestsService, private router: Router) { 
    this.users = []

  }
  async ngOnInit(): Promise<void> {
  this.users = await this.getUsers()
  }


  getUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.rqservice.get('http://localhost:3000/api/users')
        .subscribe((response: any) => {
          resolve(response);
        });
    });
   }
}
