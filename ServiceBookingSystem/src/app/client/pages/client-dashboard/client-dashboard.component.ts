import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { error } from 'console';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss'
})
export class ClientDashboardComponent {
  constructor(private clientService: ClientService, private fb: FormBuilder) { }

  ads: any;
  validateForm: FormGroup;
  ngOnInit() {
    this.validateForm = this.fb.group({
      service: [null, Validators.required]
    })
    this.getAllAds();
  }


  getAllAds() {
    this.clientService.getAllAds().subscribe(res => {
      this.ads = res;
    },
      error => {

      })
  }
  serchAdByName() {
    this.clientService.searchByServiceName(this.validateForm.get(['service']).value).subscribe(res => {
      this.ads = res;
    }, error => { })
  }
  updateImg(img) {
    return 'data:image/jpeg;base64,' + img;
  }

}
