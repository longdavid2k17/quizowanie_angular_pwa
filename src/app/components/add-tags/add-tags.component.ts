import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CategoryService} from "../../services/category.service";
import {TagsService} from "../../services/tags.service";

@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.css']
})
export class AddTagsComponent implements OnInit {
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddTagsComponent>,
              private fb: FormBuilder,
              private toastr:ToastrService,
              private tagService:TagsService) {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      id: [null]
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.tagService.save(this.form.value).subscribe(res=>{
      this.toastr.success("Poprawnie zapisano dane!","Sukces!");
      this.dialogRef.close();
    },error => {
      this.toastr.error(error.errorMessage,"Błąd podczas zapisywania danych!");
    })
  }

}
