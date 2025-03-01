import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrl: './all-ads.component.scss'
})
export class AllAdsComponent {
  ads: any;
  constructor(private companyService: CompanyService,private nzNotificationService:NzNotificationService) {

  }
  ngOnInit() {
    this.getAllAdsByUserId();
  }

  getAllAdsByUserId() {
    this.companyService.getAllAdsByuserId().subscribe(res => {
      this.ads = res;
    })
  }

  updateImg(img) {
    return 'data:image/jpeg;base64,' + img;
  }

  deleteAdById(adId:any){
    this.companyService.deleteAd(adId).subscribe(res=>{
      this.nzNotificationService.success('Success',`Ad Posted Successfully!`,{nzDuration:5000});
      this.getAllAdsByUserId();


    })
  }
}
