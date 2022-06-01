import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {QuizService} from "../../services/quiz.service";
import {QuestionsService} from "../../services/questions.service";

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

  constructor(public dialogRef: MatDialogRef<PerformQuizComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private quizService:QuizService,
              private questionsService:QuestionsService) {
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
      this.correctAnswers++;
    }
    if(this.index<this.questions.length){
      this.index++;
      this.currentQuestion = this.questions[this.index];
      console.log("Aktualny index pytania: "+this.index)
    }
    if(this.index==this.questions.length) {
      this.endMessage = "Twój wynik to "+this.correctAnswers+" poprawnych odpowiedzi z "+this.questions.length;
      console.log("KONIEC!")
    }
  }

}
