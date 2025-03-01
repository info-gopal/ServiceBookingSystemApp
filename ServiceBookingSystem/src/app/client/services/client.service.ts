import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../basic/services/storage/user-storage.service';
const BASIC_URL = "http://localhost:8080";
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }
  getAllAds(): Observable<any> {
    return this.http.get(BASIC_URL + `/api/client/ads`, {
      headers: this.createAuthorizationHeader()
    })
  }
  searchByServiceName(name: any): Observable<any> {
    return this.http.get(BASIC_URL + `/api/client/search/${name}`, { headers: this.createAuthorizationHeader() })
  }
  getAdDetailsByAdId(adId: any) {
    return this.http.get(BASIC_URL + `/api/client/ad/${adId}`, { headers: this.createAuthorizationHeader() })
  }
  createAuthorizationHeader(): HttpHeaders {
    let authHeader: HttpHeaders = new HttpHeaders();
    return authHeader.set('Authorization', 'Bearer ' + UserStorageService.getToken())
  }
  bookService(bookDTO:any):Observable<any>{
    
    return this.http.post(BASIC_URL+ `/api/client/ad/bookingService`,bookDTO,{ headers: this.createAuthorizationHeader() })
  }
  getAllMyBookings():Observable<any>{
    const userId=UserStorageService.getUserId();
    return this.http.get(BASIC_URL+`/api/client/allMyBooking/${userId}`,{headers:this.createAuthorizationHeader()});
  }
giveReview(reviewDto:any):Observable<any>{
 
  return this.http.post(BASIC_URL+`/api/client/review`,reviewDto,{headers:this.createAuthorizationHeader()})
}



}
