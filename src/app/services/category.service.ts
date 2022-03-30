import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";

const API = "http://localhost:8080/categories";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getAll():Observable<HttpResponse<any>>{
    return this.http.get<any>(`${API}/find-all`);
  }

  save(role:any):Observable<any>
  {
    return this.http.post<any>(`${API}/save`,
      role);
  }
}
