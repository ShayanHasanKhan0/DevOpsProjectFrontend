import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BraintreeService {

  private baseURL: string = environment.baseUrlBackend;

  // private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getSubDate(){
    let result = new Promise(
      async (resolve, reject)=>{
        await this.http.get(this.baseURL + '/check-subscription',
        { 
          headers: new HttpHeaders().append('Content-Type', 'application/json'),
          withCredentials:true
        }).toPromise().then(
          resolve
        )
      }
    )
    return result
  }
  
  getClientToken():Observable<any> {
    return this.http.get(this.baseURL + "/client_token", {responseType: 'text'}
    )
  }

  getPaymentMethods():Observable<any> {
    return this.http.get(this.baseURL + "/get-payment-methods",
    { 
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      withCredentials:true
    }
    )
  }

  addPaymentMethod(user:any) {
    console.log("add payment method service")
    return this.http.post(this.baseURL + "/add-payment-method", user, 
    {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      withCredentials:true
    }
    );
  }

  doSubscribe(data:any) {
    return this.http.post(this.baseURL + "/subscribe", data, 
    // {responseType: 'text'}
    {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      withCredentials:true
    }
    );
  }

  removePaymentMethod(data){
    return this.http.post(this.baseURL + "/remove-payment-method", data,
    {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      withCredentials:true
    });
  }

  cancelSubscription(data){
    return this.http.post(this.baseURL + "/cancel-braintree-subscription", data);
  }
}
