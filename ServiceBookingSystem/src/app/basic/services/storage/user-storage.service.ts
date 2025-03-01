import { Injectable } from '@angular/core';
const TOKEN = "s_token";
const USER = "s_user";


@Injectable({
  providedIn: 'root'
})

export class UserStorageService {

  constructor() { }
  public saveToken(token: string) {
    if(typeof window !== 'undefined'){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }else{
    
  }

  }
  static getToken(): string {
    if(typeof window !== 'undefined'){
      return localStorage.getItem(TOKEN);
    }
    return '';
  }
  public saveUser(user) {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }
  static getUser(): any {
    if(typeof window !== 'undefined'){

    return JSON.parse(localStorage.getItem(USER));}
    return '';

  }
  static getUserId(): string {
    const user = this.getUser();
    if (user === null) { return ''; }
    return user.userId;
  }
  static getUserRole(): string {
    const user = this.getUser();
    if (user === null) { return ''; }
    return user.role;
  }
  static isClientLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role = this.getUserRole();
    return role == 'CLIENT';
  }
  static isCompanyLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role = this.getUserRole();
    return role == 'COMPANY';
  }
  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
