import { environment } from './../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  
  constructor(private http: HttpClient) {}

  CustomerID;

  private baseURL: string = environment.baseUrlBackend;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  getSubDate(){
    let result = new Promise(
      async (resolve, reject)=>{
        await this.http.get(this.baseURL + '/subscription',
        { 
          headers: this.headers,
          withCredentials:true
        }).toPromise().then(
          resolve
        )
      }
    )
    return result
  }

  createCustomer(data){
    return this.http.post(this.baseURL + "/create-customer", data);
  } 

  StartSubscription(data) {
    return this.http.post(this.baseURL + "/create-subscription", data);
 }

 cancelSubscription(data){
  return this.http.post(this.baseURL + "/cancel-subscription", data);
 }
}