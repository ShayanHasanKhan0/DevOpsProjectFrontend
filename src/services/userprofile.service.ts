import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  private baseURL: string = environment.baseUrlBackend;

  constructor(private http: HttpClient) { }

  submitChanges(body): Observable<any> {
    return this.http.post(this.baseURL + "/userprofile", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      withCredentials:true
    });
  }

  getUserProfile():Observable<any> {
    return this.http.get(this.baseURL + "/userprofile",
    { 
      headers: new HttpHeaders().append('Content-Type', 'application/json') ,
      withCredentials:true
    })
  }
}
