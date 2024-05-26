import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgetpasswordService {

  private baseURL: string = environment.baseUrlBackend;
  // private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  emailResetLink(body): Observable<any> {
    return this.http.post(this.baseURL + "/reset-password", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  verifyToken(body, userid, token): Observable<any> {
    return this.http.post(this.baseURL + "/reset-password/" + userid + "/" + token, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  savePassword(body, userid, token): Observable<any> {
    return this.http.post(this.baseURL + "/reset-password-linkverified/" + userid + "/" + token, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  savePasswordProfile(body, userid): Observable<any> {
    return this.http.post(this.baseURL + "/reset-password-profile/" + userid, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
