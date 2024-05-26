import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizbackendService {
  private baseURL: string = environment.baseUrlBackend;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  /* API Functions */
  initialise(rootId: string){
    let result = new Promise(
      async (resolve, reject) => {
        await this.http.get(
          this.baseURL + "/initialise/" + rootId,
          { 
            headers: this.headers,
            withCredentials:true
          }
        ).toPromise().then(
          resolve
        )
      }
    )
    return result
  }

  initialisestats(rootId: string){
    let result = new Promise(
      async (resolve, reject) => {
        await this.http.get(
          this.baseURL + "/initialisestats/" + rootId,
          { 
            headers: this.headers,
            withCredentials:true
          }
        ).toPromise().then(
          resolve
        )
      }
    )
    return result
  }

  /* Isnt being used rn */
  // getNode(nodeId: string){
  //   let result = new Promise(
  //     async (resolve, reject) => {
  //       await this.http.get(
  //         this.baseURL + "/node/" + nodeId,
  //         { 
  //           headers: this.headers,
  //           withCredentials:true
  //         }
  //       ).toPromise().then(
  //         resolve
  //       )
  //     }
  //   )
  //   return result
  // }

  getList(){
    let result = new Promise(
      async (resolve, reject) => {
        await this.http.get(
          this.baseURL + "/roots",
          { 
            headers: this.headers,
            withCredentials:true
          }
        ).toPromise().then(
          resolve
        )
      }
    )
    return result
  }

  getListStats(userId: string, location: string){
    // GET
    let result = new Promise(
      async (resolve, reject)=>{
        await this.http.get(this.baseURL + "/" + location + "/" + userId,
        { 
          headers: this.headers ,
          withCredentials:true
        }).toPromise().then(
          resolve
        )
      }
    )
    // if(userId===localStorage.getItem('userId')){
    //   this.formNodes = result;      
    // }
    console.log(result)
    return result
  }

  addNode(item: any, editHasChild: boolean){
    let result = new Promise(
      async (resolve, reject)=>{
        await this.http.post(
          this.baseURL +  "/node/" + editHasChild,
          JSON.stringify({ node: item }),
          {
            observe: 'body',
            headers: this.headers,
            withCredentials:true
          }
        ).toPromise().then(
          resolve
        )
      }
    )
    return result
  }

  addImageNode(item: FormData, editHasChild: boolean){
    let result = new Promise(
      async (resolve, reject)=>{
        await this.http.post(
          this.baseURL +  "/node/image/" + editHasChild,
          item,
          {
            withCredentials:true
          }
        ).toPromise().then(
          resolve
        )
      }
    )
    return result
  }

  addProduct(item: FormData,  nodeId: string, root: string){
    let result = new Promise(
      async (resolve, reject)=>{
        await this.http.post(this.baseURL + "/product/" + root + "/" + nodeId,
        item,
        {
          withCredentials:true
        }
        ).toPromise().then(
          resolve
        )
      }
    )
    return result
  }

  updateNode(item: any, type: string):Promise<any> {
    let result = new Promise(
      async (resolve, reject)=>{
        await this.http.patch(
          this.baseURL + "/node/" + type,
          JSON.stringify({ node: item }),
          {
            observe: 'body',
            headers: this.headers,
            withCredentials:true
          }
        ).toPromise().then(
          resolve
        )
      }
    )
    return result
  }
  
  updateNodeImage(item: FormData, rootId:string, nodeId: string){
    let result = new Promise(
      async (resolve, reject)=>{
        await this.http.patch(this.baseURL + "/node/image/" + rootId + "/" + nodeId,
          item,
        {
          withCredentials:true
        }
        ).toPromise().then(
          resolve
        )
      }
    )
    return result
  }

  deleteNode(root:string, parentId: string, nodeId: string, isRange: boolean):Promise<any> {
    let result = new Promise(
      async (resolve, reject)=>{
        await this.http.delete(this.baseURL + "/node/" + root + "/" + parentId + "/" + nodeId + "/" + isRange,
        {
          headers: this.headers,
          withCredentials:true
        }
        ).toPromise().then(
          resolve
        )
      }
    )
    return result
  }

  deleteProduct(nodeId: string, productId: string):Promise<any> {
    let result = new Promise(
      async (resolve, reject)=>{
        await this.http.delete(this.baseURL + "/product/" + nodeId + "/" + productId,
        {
          headers: this.headers,
          withCredentials:true
        }
        ).toPromise().then(
          resolve
        )
      }
    )
    return result
  }
}
