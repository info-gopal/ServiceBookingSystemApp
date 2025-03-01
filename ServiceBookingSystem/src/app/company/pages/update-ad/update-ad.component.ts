import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-update-ad',
  templateUrl: './update-ad.component.html',
  styleUrl: './update-ad.component.scss'
})
export class UpdateAdComponent {
  adId:any=this.activateRoute.snapshot.params['adId'];
  imageChanged=false;
  exstingImg:string | null=null;
  constructor(private fb:FormBuilder,private notification:NzNotificationService,private activateRoute:ActivatedRoute, private router:Router,private companyService:CompanyService){

  }

  getAdById(){
    this.companyService.getAdById(this.adId).subscribe(res=>{
      console.log(res);
      this.validateForm.patchValue(res);
      this.exstingImg='data:image/jpeg;base64,'+res.img;
    })
  }


  selectedFile:File | null;
  imagePreview:string | ArrayBuffer |null;
  validateForm:FormGroup;

  ngOnInit(){
    this.getAdById();
    this.validateForm=this.fb.group({
      serviceName:[null,[Validators.required]],
      description:[null,[Validators.required]],
      price:[null,[Validators.required]]

    })
  }
  onSelected(event:any){
    this.selectedFile=event.target.files[0];
    this.previewImage();
    this.exstingImg=null;
    this.imageChanged=true;
  }
  previewImage() {
   const reader=new FileReader();
   reader.onload=()=>{
    this.imagePreview=reader.result;
   }
   reader.readAsDataURL(this.selectedFile)
  }
  updateAd(){

    const formdata: FormData=new FormData();
    if(this.imageChanged && this.selectedFile){
      formdata.append('file',this.selectedFile);
    }
   
    formdata.append('serviceName',this.validateForm.get('serviceName').value);
    formdata.append('description',this.validateForm.get('description').value);
    formdata.append('price',this.validateForm.get('price').value);
debugger
    this.companyService.updateAd(this.adId,formdata).subscribe(res=>{
      debugger
      this.notification.success('Success',`Ad Updated Successfully!`,{nzDuration:5000});
      this.router.navigateByUrl('/company/ads');

    },error=>{

    })

  }


  // toLong(value: any): bigint | null {
  //   debugger
  //   if (typeof value === 'number' || typeof value === 'string') {
  //     try {
  //       return BigInt(value);
  //     } catch (error) {
  //       console.error("Conversion to BigInt failed:", error);
  //       return null;
  //     }
  //   }
  //   console.warn("Value is not a number or string:", value);
  //   return null;
  // }
}
