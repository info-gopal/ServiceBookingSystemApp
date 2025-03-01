import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up-company',
  templateUrl: './sign-up-company.component.html',
  styleUrl: './sign-up-company.component.scss'
})
export class SignUpCompanyComponent {

  validateForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private notification: NzNotificationService, private router: Router) {

  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      userEmail: [null, [Validators.email, Validators.required]],
      userName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      mobileNo: [null],
      password: [null, [Validators.required]]
      //confirmPassword:[null,[Validators.required]]




    })
  }


  submirForm() {
    this.authService.registerCompany(this.validateForm.value).subscribe(res => {
      this.notification.success('SUCCESS', `SINGUP SUCCESSFULLY`, { nzDuration: 5000 });
      this.router.navigateByUrl('/login')

    }, error => {

      this.notification.error('ERROR', `${error.error}`, { nzDuration: 5000 });
    });


  }

}
