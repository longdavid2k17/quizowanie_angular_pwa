import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-perform-quiz',
  templateUrl: './perform-quiz.component.html',
  styleUrls: ['./perform-quiz.component.css']
})
export class PerformQuizComponent implements OnInit {

  quizId:any;
  secondsCount: number = 5;

  constructor(public dialogRef: MatDialogRef<PerformQuizComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.quizId=data.id;
  }

  ngOnInit(): void {
    this.countdown();
  }

  countdown():void{
/*        while (this.secondsCount!=0){
      this.secondsCount=this.secondsCount-1;
      setTimeout(() =>{
      },1000);
    }*/
  }

}
