import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private httpClient: HttpClient) { }

  get(url: string){
    return this.httpClient.get(url);
  }

  post(url: string, body:any, headers: any){
    return this.httpClient.post<any>(url,body, { headers: headers })
  }

  delete(url: string){
    return this.httpClient.delete<any>(url)
  }

  update(url: string, body:any){
    return this.httpClient.patch<any>(url,body)
  }
}
