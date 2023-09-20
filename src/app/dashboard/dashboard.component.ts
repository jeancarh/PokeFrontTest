import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;
  parsedUser: any;
  activatePokemon: boolean;
  activateFavs: boolean;
  activateUsers: boolean;

  constructor(private router: Router) {
    this.activatePokemon = false;
    this.activateFavs = false;
    this.activateUsers = false;
  }
  async ngOnInit(): Promise<void> {
    this.user = localStorage.getItem('user');
    this.parsedUser = JSON.parse(this.user);
  }

  closeSession() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  activatePokemonView() {
    this.activatePokemon = true;
    this.activateFavs = false;
    this.activateUsers = false;
  }

  activateFavsView() {
    this.activatePokemon = false;
    this.activateFavs = true;
    this.activateUsers = false;
  }

  activateUsersView() {
    this.activatePokemon = false;
    this.activateFavs = false;
    this.activateUsers = true;
  }
}
