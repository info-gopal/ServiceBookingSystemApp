import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientService } from '../../services/client.service';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';
import { error } from 'console';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  bookId:number=this.activetedRoute.snapshot.params['id'];
  validationForm!:FormGroup;
  constructor(private fb:FormBuilder, private notificationService:NzNotificationService,private route:Router,private clientService:ClientService,private activetedRoute:ActivatedRoute){

  }
  ngOnInit(){
    this.validationForm=this.fb.group({
      rating:[null,Validators.required],
      review:[null,Validators.required]
    })
  }

  giveReview(){
    const reviewDto={
      rating:this.validationForm.get("rating").value,
      review:this.validationForm.get("review").value,
      userId:UserStorageService.getUserId(),
      bookId:this.bookId

    }
    debugger
    this.clientService.giveReview(reviewDto).subscribe(res=>{
      this.notificationService.success('Sucess',`Review successfully posted`,{nzDuration:5000});
      this.route.navigateByUrl("/client/bookings")
    },error=>{
      this.notificationService.error('Error',`${error.message}`,{nzDuration:5000});
    }
  )
  }

}
