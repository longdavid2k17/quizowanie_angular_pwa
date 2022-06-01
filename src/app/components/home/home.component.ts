import {Component, HostListener, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {QuizService} from "../../services/quiz.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PerformQuizComponent} from "../perform-quiz/perform-quiz.component";
import {QuestionsEditFormComponent} from "../questions-edit-form/questions-edit-form.component";
import {QuizOwnershipService} from "../../services/quiz-ownership.service";
import {ErrorMessageClass} from "../add-question/add-question.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  quizes:any[]=[];
  totalElements: number = 0;
  activeFilter:any;
  constructor(private quizService:QuizService,
              private toastr: ToastrService,
              private router:Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private quizOwnershipService:QuizOwnershipService) { }

  ngOnInit(): void {
    const request = {};
    // @ts-ignore
    request['page'] = 0;
    // @ts-ignore
    request['size'] = 10;
    this.getData(request);
  }

  getData(request?:any){
    this.quizService.getAll(request).subscribe(res =>{
      // @ts-ignore
      this.quizes = res['content'];
      // @ts-ignore
      this.totalElements = res['totalElements'];
    },error => {
      console.log(error);
      this.toastr.error(error.error,'Błąd!');
    });
  }

  getValue(value:any){
    if(value.length>0)
    {
      const request = {};
      // @ts-ignore
      request['page'] = 0;
      // @ts-ignore
      request['size'] = 10;
      // @ts-ignore
      request['filter'] = value;
      this.activeFilter = value;
      this.getData(request);
    }
    else {
      this.activeFilter=null;
      const request = {};
      // @ts-ignore
      request['page'] = 0;
      // @ts-ignore
      request['size'] = 10;
      this.getData(request);
    }
  }

  nextPage(event: PageEvent) {
    const request = {};
    // @ts-ignore
    request['page'] = event.pageIndex.toString();
    // @ts-ignore
    request['size'] = event.pageSize.toString();

    if(this.activeFilter)
      { // @ts-ignore
        request['filter'] = this.activeFilter;
      }
    this.getData(request);
  }

  openQuiz(id:any) {
    this.quizService.getQuestionsState(id).subscribe(res=>{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data={id};
      this.dialog.open(PerformQuizComponent, dialogConfig);
    },error => {
      this.toastr.error(ErrorMessageClass.getErrorMessage(error),"Błąd!");
    })

  }

  editQuis(id:any) {
    const dialogConfig = new MatDialogConfig();

    let quizes = this.quizOwnershipService.getIDs();
    if(quizes?.includes(id+",")){
      //dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data={id};
      this.dialog.open(QuestionsEditFormComponent, dialogConfig);
    }
    else {
      this.toastr.error("Nie masz uprawnień do edycji tego quizu!");
    }
  }
}
