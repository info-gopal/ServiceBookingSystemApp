import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../basic/services/storage/user-storage.service';
const BASIC_URL = "http://localhost:8080";
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }
  postAd(addDTO: any): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.post(BASIC_URL + `/api/company/ad/${userId}`, addDTO, { headers: this.createAuthorizationHeader() })
  }
  createAuthorizationHeader(): HttpHeaders {
    let authHeader: HttpHeaders = new HttpHeaders();
    return authHeader.set('Authorization', 'Bearer ' + UserStorageService.getToken())
  }
  getAllAdsByuserId():Observable<any>{
    const userId=UserStorageService.getUserId();
    return this.http.get(BASIC_URL+`/api/company/ads/${userId}`,{
      headers:this.createAuthorizationHeader()
    })
  }
  getAdById(adId:any):Observable<any>{    
    return this.http.get(BASIC_URL+`/api/company/ad/${adId}`,{headers:this.createAuthorizationHeader()});
  }
  updateAd(adId:any,adDTO:any):Observable<any>{
    return this.http.put(BASIC_URL+`/api/company/ad/${adId}`,adDTO,{headers:this.createAuthorizationHeader()});
  }
  deleteAd(adId:any):Observable<any>{
    return this.http.delete(BASIC_URL+`/api/company/ad/${adId}`,{headers:this.createAuthorizationHeader()});
  }
  getAllBookingsByuserId():Observable<any>{
    const companyId=UserStorageService.getUserId();
    return this.http.get(BASIC_URL+`/api/company/bookings/${companyId}`,{
      headers:this.createAuthorizationHeader()
    })
  }
 changeBookingStatus(bookingId:number,status:string):Observable<any>{
  return this.http.get(BASIC_URL+`/api/company/bookings/${bookingId}/${status}`,{headers:this.createAuthorizationHeader()})
 }

}
