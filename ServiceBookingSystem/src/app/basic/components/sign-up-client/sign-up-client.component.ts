import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-sign-up-client',
  templateUrl: './sign-up-client.component.html',
  styleUrl: './sign-up-client.component.scss'
})
export class SignUpClientComponent {
  validateForm!:FormGroup;
  constructor(private fb:FormBuilder,private authService:AuthService,private notification:NzNotificationService,private router:Router){

  }
  ngOnInit(){
    this.validateForm=this.fb.group({
      userEmail:[null,[Validators.email,Validators.required]],
      userName:[null,[Validators.required]],
      lastName:[null,[Validators.required]],
      mobileNo:[null],
      password:[null,[Validators.required]]
      //confirmPassword:[null,[Validators.required]]




    })
  }


  submirForm(){
this.authService.registerClient(this.validateForm.value).subscribe(res=>{
  this.notification.success('SUCCESS',`SINGUP SUCCESSFULLY`,{nzDuration:5000});
  this.router.navigateByUrl('/login')

},error=>{

  this.notification.error('ERROR',`${error.error}`,{nzDuration:5000});
});


  }
}
