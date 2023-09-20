import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'users', component: UsersComponent,  canActivate: [AuthGuard]},
  { path: 'pokemons', component: PokemonsComponent,  canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard]},
  { path: 'myfavorites', component: FavoritesComponent,  canActivate: [AuthGuard]},

];
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    PokemonsComponent,
    DashboardComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
