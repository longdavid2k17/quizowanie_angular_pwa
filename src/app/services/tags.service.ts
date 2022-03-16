import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";

const API = "http://localhost:8080/tags";

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http:HttpClient) { }

  getAll():Observable<HttpResponse<any>>{
    return this.http.get<any>(`${API}/find-all`);
  }
}
