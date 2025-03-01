import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpClientComponent } from './basic/components/sign-up-client/sign-up-client.component';
import { LoginComponent } from './basic/components/login/login.component';
import { SignUpCompanyComponent } from './basic/components/sign-up-company/sign-up-company.component';
import { SingupComponent } from './basic/components/singup/singup.component';

const routes: Routes = [
  
  {path:'register_client',component:SignUpClientComponent},
  {path:'register_company',component:SignUpCompanyComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:SingupComponent},
  { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) }, 
  { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
