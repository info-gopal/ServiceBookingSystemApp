import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { AdDetailsResponse } from '../../ad-details.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrl: './ad-details.component.scss'
})
export class AdDetailsComponent {
 adId= this.activatedRoute.snapshot.params['adId'];
 avatarUrl:any;
 ad:any;
 validateForm:FormGroup;
 reviews:any;
  constructor(private clientService:ClientService,private activatedRoute:ActivatedRoute,private notification:NzNotificationService,private router:Router,private fb:FormBuilder){  }

  ngOnInit(){
    this.validateForm=this.fb.group({
      bookDate:[null,[Validators.required]]
    })
    this.getAdDetailsByAdId();
  }
  
  getAdDetailsByAdId(){
    this.clientService.getAdDetailsByAdId(this.adId).subscribe((res:AdDetailsResponse)=>{

      if (res && res.adDto && res.adDto.img) {
        this.avatarUrl = 'data:image/jpeg;base64,' + res.adDto.img;
        this.ad=res.adDto;
        debugger
        this.reviews=res.reviews;
       // console.log('Ad details:', res);
      } else {
       //  console.error('Error fetching ad details:', error);
      }


    },
    error=>{ //console.error('Error fetching ad details:', error);
      
    })
  }
bookService(){
  const bookServiceDTO={
    bookDate:this.validateForm.get(['bookDate']).value,
    adId:this.adId,
    userId:UserStorageService.getUserId()
  }
  this.clientService.bookService(bookServiceDTO).subscribe(res=>{
    this.notification.success('Success',`Request posted successfully`,{nzDuration:5000})
  },
    error=>{});
    this.router.navigateByUrl('/client/bookings');
}
}
