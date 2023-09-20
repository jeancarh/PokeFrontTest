import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLoggedIn() {
    const retrievedObject = JSON.parse(localStorage.getItem('user') || '{}');
    if (retrievedObject.logged === true) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('user');
  }
}
