import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

const API = "http://localhost:8080/home"

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  getALl(params?:any):Observable<HttpResponse<any>>{
    return this.http.get<any>(`${API}/find-all`,{
      params
    });
  }

  save(quiz:any):Observable<HttpResponse<any>>{
    return this.http.post<any>(`${API}/save`,quiz);
  }
}
