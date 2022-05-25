import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute} from "@angular/router";
import {QuestionsService} from "../../services/questions.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  form: FormGroup;
  existingQuestions:any[]=[];
  answers:any[]=[];
  tempQuestion:any;
  quizId:any;
  errorMessageAnswers:any;
  errorGeneralMessage:any;

  roleIcons:string[] =["account_circle","build","html",
    "javascript","data_thresholding","language","lightbulb",
    "question_answer","supervisor_account","view_in_ar","php","install_mobile",
    "install_desktop"];
  constructor(@Inject(DOCUMENT) private document: Document,
              private fb: FormBuilder,
              private toastr:ToastrService,
              private categoryService:CategoryService,
              private activatedRoute:ActivatedRoute,
              private questionsService:QuestionsService
              ) {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(3)]],
      answer: [null],
      id: [null]
    });
    this.quizId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

  }

  addAnswer() {
    let answer = {
      text:this.form.controls['answer'].value
    };
    this.answers.push(answer);
  }

  onChangeEvent(event: any) {
    this.tempQuestion = event.target.value;
  }

  addQuestionPackage() {
    let correctVals =0;
    for(let answer of this.answers){
      if(answer.isCorrect)
        correctVals++;
    }
    if(this.answers.length>4){
      this.errorMessageAnswers = "Nieprawidłowa ilość odpowiedzi (max 4)!";
      return;
    }
    else if(correctVals!=1){
      this.errorMessageAnswers = "Nieprawidłowa ilość poprawnych odpowiedzi!";
      return;
    }else {
      let question ={
        text:this.tempQuestion,
        answerList:this.answers
      }
      this.existingQuestions.push(question);
      this.form.reset();
      this.answers=[];
      this.errorMessageAnswers=null;
    }

  }

  save() {
    if(!this.quizId){
      this.errorGeneralMessage="Nie można przeprowadzić tej operacji! Brak parametru quizId";
    }else {
      let fullPackage={
        quizId:this.quizId,
        questionEntityPayloadList:this.existingQuestions
      }
      this.errorGeneralMessage=null;
      console.log(fullPackage);
      this.questionsService.save(fullPackage).subscribe(res=>{
        this.toastr.success("Poprawnie zapisano pytania!")
        setTimeout(() =>{
          this.document.location.href = '/home';
        },2000);
      },error => {
        this.toastr.error(ErrorMessageClass.getErrorMessage(error),"Błąd!")
      });
    }
  }

  checkValue(event: any, answer: any)
  {
    answer.isCorrect = event.currentTarget.checked;
    if(answer.isCorrect){
      answer.poprawny=1;
    }
    else answer.poprawny=0;
  }
}

export class ErrorMessageClass {
  public static getErrorMessage(err: any):any {
    const detail =
      this.getNotEmpty(err?.error?.message) ??
      this.getNotEmpty(err?.error?.detail) ??
      this.getNotEmpty(err?.error?.error) ??
      this.getNotEmpty(err?.error) ??
      this.getNotEmpty(err?.message) ??
      this.getNotEmpty(err?.statusText) ??
      this.getNotEmpty(err) ??
      undefined;
    return detail;
  }

  private static getNotEmpty(val?: unknown): string | undefined {
    if (val && typeof val === 'string' && val.length) {
      return val;
    }
    return;
  }
}
