import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomizequizService {

  private baseURL: string = environment.baseUrlBackend;

  constructor(private http: HttpClient) { }

  getCustomQuiz(formid):Observable<any>{
    return this.http.get(this.baseURL + "/customizequiz/" + formid,
    { 
      headers: new HttpHeaders().append('Content-Type', 'application/json') ,
      withCredentials:true
    })
  }

  submitChanges(body,formid): Observable<any> {
    return this.http.post(this.baseURL + "/customizequiz/" + formid, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      withCredentials:true
    });
  }
}
