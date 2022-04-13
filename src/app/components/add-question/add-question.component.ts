import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute} from "@angular/router";

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
  constructor(public dialogRef: MatDialogRef<AddQuestionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private toastr:ToastrService,
              private categoryService:CategoryService,
              private activatedRoute:ActivatedRoute,
              ) {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(3)]],
      answer: [null],
      id: [null]
    });
    this.quizId=data.quizId;
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.categoryService.save(this.form.value).subscribe(res=>{
      this.toastr.success("Poprawnie zapisano dane!","Sukces!");
      this.dialogRef.close();
    },error => {
      this.toastr.error(error.errorMessage,"Błąd podczas zapisywania danych!");
    })
  }

  addAnswer() {
    let answer = {
      text:this.form.controls['answer'].value
    };
    this.answers.push(answer);
  }

  onChangeEvent(event: any) {
    this.tempQuestion = event.target.value;
    console.log(this.tempQuestion);
  }

  addQuestionPackage() {
    let correctVals =0;
    for(let answer of this.answers){
      if(answer.isCorrect)
        correctVals++;
    }
    if(this.answers.length>4){
      this.errorMessageAnswers = "Nieprawidłowa ilość odpowiedzi (max 4)!";
    }
    else if(correctVals!=1){
      this.errorMessageAnswers = "Nieprawidłowa ilość poprawnych odpowiedzi!";
    }else {
      let question ={
        text:this.tempQuestion,
        answers:this.answers
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
        id:null,
        quizId:this.quizId,
        questions:this.existingQuestions
      }
      this.errorGeneralMessage=null;
      console.log(fullPackage);
    }
  }

  checkValue(event: any, answer: any)
  {
    answer.isCorrect = event.currentTarget.checked;
  }
}
