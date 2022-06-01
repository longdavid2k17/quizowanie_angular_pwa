import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {QuizService} from "../../services/quiz.service";
import {QuestionsService} from "../../services/questions.service";
import {ErrorMessageClass} from "../add-question/add-question.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-perform-quiz',
  templateUrl: './perform-quiz.component.html',
  styleUrls: ['./perform-quiz.component.css']
})
export class PerformQuizComponent implements OnInit {
  correctAnswers:number=0;
  quiz:any;
  questions:any=[];
  currentQuestion:any;
  index:number=0;
  entryData:any;
  endMessage:any;
  errorMessage:any;
  result:any;

  review:any;

  allCorrect:boolean=false;
  mostCorrect:boolean=false;
  lessCorrect:boolean=false;

  constructor(public dialogRef: MatDialogRef<PerformQuizComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private quizService:QuizService,
              private questionsService:QuestionsService,
              private toastr: ToastrService,) {
  this.entryData = data;
  }

  ngOnInit(): void {
    this.quizService.getQuestionsState(this.entryData.id).subscribe(res=>{
      this.quizService.getById(this.entryData.id).subscribe(res=>{
        this.quiz = res;
      });
      this.questionsService.getAllById(this.entryData.id).subscribe(res=>{
        this.questions = res;
        if(this.questions && this.questions.length>0) {
          this.currentQuestion = this.questions[this.index];
        }
      });
    },error => {
      this.errorMessage = "Wystąpił błąd podczas uruchamiania quizu!";
    });
  }

  nextQuestion(answer:any):void{
    if(answer?.correct && (answer.correct===true || answer.correct==="true")){
      console.log("POPRAWNA")
      this.correctAnswers++;
    }
    if(this.index<this.questions.length){
      this.index++;
      this.currentQuestion = this.questions[this.index];
      console.log("Aktualny index pytania: "+this.index)
    }
    if(this.index==this.questions.length) {
      this.quizService.incrementPlaysCount(this.entryData.id).subscribe(res=>{
        this.toastr.success("Ukończono quiz!");
      },error => {
        this.toastr.error(ErrorMessageClass.getErrorMessage(error),"Błąd!");
      })
      this.endMessage = "Twój wynik to "+this.correctAnswers+" poprawnych odpowiedzi z "+this.questions.length;
      if(this.correctAnswers/this.questions.length==1){
        this.result="Wybitnie! Wręcz idealnie!"
        this.allCorrect=true;
      }
      else if(this.correctAnswers/this.questions.length>=0.5){
        this.result="Brawo! Całkiem dobrze ci poszło!"
        this.mostCorrect=true;
      }else {
        this.result="Mogło być lepiej, ale wierz w siebie!"
        this.lessCorrect=true;
      }
    }
  }

  sendReview() {
    this.quizService.setReview(this.data.id,this.review).subscribe(res=>{
      this.dialogRef.close();
    },error =>{
      this.toastr.error(ErrorMessageClass.getErrorMessage(error),"Błąd wysyłania oceny!");
    })
  }

  setReview(number: number) {
    this.review=number;
  }
}
