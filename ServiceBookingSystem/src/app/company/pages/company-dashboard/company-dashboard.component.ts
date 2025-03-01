import { Component } from '@angular/core';
import { ClientService } from '../../../client/services/client.service';
import { CompanyService } from '../../services/company.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { error } from 'console';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.scss'
})
export class CompanyDashboardComponent {
  constructor(private companyService:CompanyService,private notificationService:NzNotificationService){}
  bookings:any;
  ngOnInit(){
    this.getAllBooking();
  }
  getAllBooking(){
    this.companyService.getAllBookingsByuserId().subscribe(res=>{
      this.bookings=res;
      console.log(res);
      
    })
  }
  changeBookingStatus(bookingId:number,status:string){
    this.companyService.changeBookingStatus(bookingId,status).subscribe(res=>{
      this.notificationService.success('SUCCESS',`Booking Status Changed Successfully`,{nzDuration:5000});
      this.getAllBooking();

    },
  error=>{})
  }

}
