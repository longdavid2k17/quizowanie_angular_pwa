import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-perform-quiz',
  templateUrl: './perform-quiz.component.html',
  styleUrls: ['./perform-quiz.component.css']
})
export class PerformQuizComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PerformQuizComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
