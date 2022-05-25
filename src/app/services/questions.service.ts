import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";

const API = "http://localhost:8080/api/questions";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http:HttpClient) { }

  save(questions:any):Observable<any>
  {
    return this.http.post<any>(`${API}/save`,
      questions);
  }

  edit(questions:any):Observable<any> {
    return this.http.post<any>(`${API}/edit`,
      questions);
  }

  getAllById(id:any):Observable<HttpResponse<any>>{
    return this.http.get<any>(`${API}/${id}`);
  }
}
