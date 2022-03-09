import { Component, OnInit } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {QuizService} from "../../services/quiz.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  quizes:any[]=[];
  totalElements: number = 0;
  constructor(private quizService:QuizService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  getData(request:any){
    this.quizService.getALl(request).subscribe(res =>{
      // @ts-ignore
      this.quizes = res['content'];
      // @ts-ignore
      this.totalElements = res['totalElements'];
    },error => {
      console.log(error);
      this.toastr.error(error.errorMessage,'Błąd!');
    });
  }

  nextPage(event: PageEvent) {
    const request = {};
    // @ts-ignore
    request['page'] = event.pageIndex.toString();
    // @ts-ignore
    request['size'] = event.pageSize.toString();
    this.getData(request);
  }

}
