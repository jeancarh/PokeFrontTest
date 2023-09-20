import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../services/requests.services';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent {
  favs:any
  pokemons:any
  user:any
  dataSaved: boolean
  constructor(private rqservice: RequestsService, private router: Router) {
    this.favs = [];
    this.pokemons = [];
    this.user = ''
    this.dataSaved = false
  }
  async ngOnInit(): Promise<void> {
    this.favs = await this.getFavorites();
    this.pokemons = await this.getPokemons();
  }
  getPokemons(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.rqservice.get('http://localhost:3000/api/pokemons')
        .subscribe((response: any) => {
          resolve(response.results);
        });
    });
   }
  async getFavorites(): Promise<any> {
    this.user = localStorage.getItem('user')
    let parsedUser = JSON.parse(this.user)
    return new Promise((resolve, reject) => {
      this.rqservice
        .get(`http://localhost:3000/api/users/favorites?id=${parsedUser.id}`)
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  addItemToTarget(item: any) {
    if (!this.favs.includes(item)) {
      this.favs.push(item);
    } else {
      // Handle duplicate item (optional)
      console.log(`${item} already exists in the targetArray.`);
    }
  }

  saveData(): Promise<any>  {
    let headers = new HttpHeaders();
    this.user = localStorage.getItem('user')
    let parsedUser = JSON.parse(this.user)
    return new Promise((resolve, reject) => {
      this.rqservice.post('http://localhost:3000/api/users/favorites',  {
        username: parsedUser.username,
        favorites: this.favs
    }, headers)
        .subscribe((response: any) => {
          resolve(response);
          this.dataSaved = true
        });
    });
  }
}
