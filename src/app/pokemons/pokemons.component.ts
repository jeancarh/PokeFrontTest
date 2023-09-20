import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit{
  pokemons = [];
  constructor(private rqservice: RequestsService, private router: Router) { 
     this.pokemons = []
  }
  async ngOnInit(): Promise<void> {
  this.pokemons = await this.getPokemons()
  }


  getPokemons(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.rqservice.get('http://localhost:3000/api/pokemons')
        .subscribe((response: any) => {
          resolve(response.results);
        });
    });
   }
}
