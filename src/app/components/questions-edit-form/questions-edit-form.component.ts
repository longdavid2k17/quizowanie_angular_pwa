import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {QuizService} from "../../services/quiz.service";
import {ToastrService} from "ngx-toastr";
import {ErrorMessageClass} from "../add-question/add-question.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute} from "@angular/router";
import {QuestionsService} from "../../services/questions.service";
import {QuizOwnershipService} from "../../services/quiz-ownership.service";

@Component({
  selector: 'app-questions-edit-form',
  templateUrl: './questions-edit-form.component.html',
  styleUrls: ['./questions-edit-form.component.css']
})
export class QuestionsEditFormComponent implements OnInit {

  form: FormGroup;
  formQuiz: FormGroup;
  existingQuestions:any=[];
  answers:any[]=[];
  tempQuestion:any;
  quizId:any;
  errorMessageAnswers:any;
  errorGeneralMessage:any;

  errorMessage='';

  roleIcons:string[] =["account_circle","build","html",
    "javascript","data_thresholding","language","lightbulb",
    "question_answer","supervisor_account","view_in_ar","php","install_mobile",
    "install_desktop"];
  editedQuiz:any;
  constructor(public dialogRef: MatDialogRef<QuestionsEditFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private quizService:QuizService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private categoryService:CategoryService,
              private activatedRoute:ActivatedRoute,
              private questionsService:QuestionsService,
              private quizOwnership:QuizOwnershipService) {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(3)]],
      answer: [null],
      id: [null]
    });
    this.formQuiz = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(3)]],
      tag: [null],
      id: [null],
      category: [null],
      creationDate: [null],
    });
    this.quizId = this.data.id;
    this.quizService.getById(this.data.id).subscribe(res=>{
      this.editedQuiz = res;
      this.formQuiz.patchValue(res);
    },error => {
      this.toastr.error(ErrorMessageClass.getErrorMessage(error),"Błąd!");
    });
    this.questionsService.getAllById(this.data.id).subscribe(res=>{
      this.existingQuestions=res;
    });

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
        questionText:this.tempQuestion,
        answerList:this.answers,
        id:null,
        quizId:this.editedQuiz.id
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
    }
    else if (this.existingQuestions.length==0){
      this.errorGeneralMessage="Brak pytań do zapisu!";
    } else {
      let fullPackage={
        quiz:this.editedQuiz,
        questionEntityPayloadList:this.existingQuestions
      }
      this.errorGeneralMessage=null;
      console.log(fullPackage);
      this.questionsService.edit(fullPackage).subscribe(res=>{
        this.toastr.success("Poprawnie zapisano pytania!");
      },error => {
        this.toastr.error(ErrorMessageClass.getErrorMessage(error),"Błąd!")
      });
    }
  }

  onSubmit(): void {
    if (!this.formQuiz.valid) {
      return;
    }
    if(!this.formQuiz.controls['tag'].value?.id && this.formQuiz.controls['tag'].value){
      this.formQuiz.controls['tag'].setValue({id:null,name:this.formQuiz.controls['tag'].value});
    }
    this.quizService.save(this.formQuiz.value).subscribe(res=>{
        this.toastr.success("Poprawnie zapisano nowy quiz!","Sukces!");
        this.editedQuiz = res;
        this.formQuiz.patchValue(res);
        setTimeout(() =>{
          this.quizOwnership.saveQuizId(res.id);
        },2000);
      },
      error => {
        this.toastr.error(error.errorMessage,"Błąd!");
      });
  }

  checkValue(event: any, answer: any)
  {
    answer.isCorrect = event.currentTarget.checked;
    if(answer.isCorrect){
      answer.poprawny=1;
    }
    else answer.poprawny=0;
  }

  remove(question: any) {
    const index = this.existingQuestions.indexOf(question, 0);
    if (index > -1) {
      this.existingQuestions.splice(index, 1);
    }
  }
}
