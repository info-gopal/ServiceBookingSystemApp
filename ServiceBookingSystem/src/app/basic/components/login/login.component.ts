import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private authService: AuthService, private notification: NzNotificationService, private router: Router) {


  }
  validateForm!: FormGroup;
  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

  }


  submitForm() {
    this.authService.login(this.validateForm.get(['userName'])!.value, this.validateForm.get(['password'])!.value).subscribe(res => {
      if(UserStorageService.isClientLoggedIn()){
        this.router.navigateByUrl('client/dashboard');
      }else if(UserStorageService.isCompanyLoggedIn()){
        this.router.navigateByUrl('company/dashboard');
      }

    },
      error => {
        this.notification.error('ERROR', `Bad crendentials`, { nzDuration: 5000 })
      })
  }
}
