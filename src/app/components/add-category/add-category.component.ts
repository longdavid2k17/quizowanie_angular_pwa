import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../services/category.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  form: FormGroup;

  roleIcons:string[] =["account_circle","build","html",
    "javascript","data_thresholding","language","lightbulb",
    "question_answer","supervisor_account","view_in_ar","php","install_mobile",
    "install_desktop"];
  constructor(public dialogRef: MatDialogRef<AddCategoryComponent>,
              private fb: FormBuilder,
              private toastr:ToastrService,
              private categoryService:CategoryService) {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(3)]],
      id: [null]
    });
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
}