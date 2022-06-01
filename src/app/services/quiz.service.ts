import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

const API = "http://localhost:8080/home"

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  getAll(params?:any):Observable<HttpResponse<any>>{
    return this.http.get<any>(`${API}/find-all`,{
      params
    });
  }

  getById(id:any):Observable<HttpResponse<any>>{
    return this.http.get<any>(`${API}/${id}`);
  }

  save(quiz:any):Observable<any>{
    return this.http.post<any>(`${API}/save`,quiz);
  }

  getQuestionsState(id: any) :Observable<HttpResponse<any>>{
    return this.http.get<any>(`${API}/check-for-questions/${id}`);
  }
}
