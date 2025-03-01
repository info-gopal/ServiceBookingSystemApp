import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {
  bookedService:any;
  constructor(private clientService:ClientService){

  }
  getMyBookings(){
    this.clientService.getAllMyBookings().subscribe(res=>{
      this.bookedService=res;
    })
  }
ngOnInit(){
  this.getMyBookings();
}
}
