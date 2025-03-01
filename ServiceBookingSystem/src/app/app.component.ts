import { Component } from '@angular/core';
import { UserStorageService } from './basic/services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ServiceBookingSystem';
   isClientLoggedin: boolean = UserStorageService.isClientLoggedIn();
   isCompanyLoggedin: boolean = UserStorageService.isCompanyLoggedIn();
   constructor(private router: Router) { }
  ngOnInit() {
    this.router.events.subscribe(event => {
      this.isClientLoggedin = UserStorageService.isClientLoggedIn();
      this.isCompanyLoggedin = UserStorageService.isCompanyLoggedIn();
    })
  }

  logOut(){
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
}
