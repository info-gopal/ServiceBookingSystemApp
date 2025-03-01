import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../services/company.service';
import { error } from 'console';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.scss'
})
export class CreateAdComponent {

  selectedFile:File | null;
  imagePreview:string | ArrayBuffer |null;
  validateForm:FormGroup;
  constructor(private fb:FormBuilder,private notification:NzNotificationService, private router:Router,private companyService:CompanyService){

  }
  ngOnInit(){
    this.validateForm=this.fb.group({
      serviceName:[null,[Validators.required]],
      description:[null,[Validators.required]],
      price:[null,[Validators.required]]

    })
  }
  onSelected(event:any){
    this.selectedFile=event.target.files[0];
    this.previewImage();
  }
  previewImage() {
   const reader=new FileReader();
   reader.onload=()=>{
    this.imagePreview=reader.result;
   }
   reader.readAsDataURL(this.selectedFile)
  }
  postAd(){
    const formdata: FormData=new FormData();
    formdata.append('file',this.selectedFile);
    formdata.append('serviceName',this.validateForm.get('serviceName').value);
    formdata.append('description',this.validateForm.get('description').value);
    formdata.append('price',this.validateForm.get('price').value)
    this.companyService.postAd(formdata).subscribe(res=>{
      this.notification.success('Success',`Ad Posted Successfully!`,{nzDuration:5000});
      this.router.navigateByUrl('/company/ads');

    },error=>{

    })

  }


}
