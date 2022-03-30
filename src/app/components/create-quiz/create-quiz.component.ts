import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TagsService} from "../../services/tags.service";
import {CategoryService} from "../../services/category.service";
import {QuizService} from "../../services/quiz.service";
import {ToastrService} from "ngx-toastr";
import {map, Observable, startWith} from "rxjs";
import {MatOption} from "@angular/material/core";
import {AddCategoryComponent} from "../add-category/add-category.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  form: FormGroup;
  myControl = new FormControl();
  errorMessage='';
  selectedTag:any[] = [];
  categories:any[] = [];
  tagsDB:any[] = [];
  filteredTags: Observable<any[]>;

  constructor(private tagsService:TagsService,
              private categoryService:CategoryService,
              private quizService:QuizService,
              private toastr:ToastrService,
              private fb: FormBuilder,
              public dialog: MatDialog) {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(3)]],
      tag: [null],
      id: [null],
      category: [null],
      creationDate: [null],
    });
    this.tagsService.getAll().subscribe(out => {
      // @ts-ignore
      this.tagsDB = out;
    },error => {
      console.log(error.error)
    });
    this.categoryService.getAll().subscribe(res => {
      // @ts-ignore
      this.categories = res;
    },error => {
      console.log(error.error)
    });
    this.filteredTags = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(tag => tag ? this.filterTags(tag) : this.tagsDB.slice())
      );
  }

  filterTags(name: string) {
    return this.tagsDB.filter(tag =>
      tag.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    if(!this.form.controls['tag'].value?.id && this.form.controls['tag'].value){
      this.form.controls['tag'].setValue({id:null,name:this.form.controls['tag'].value});
    }
    console.log(this.form.controls['tag'].value);
      this.quizService.save(this.form.value).subscribe(res=>{
          this.toastr.success("Poprawnie zapisano nowy quiz!","Sukces!")
        },
        error => {
          this.toastr.error(error.errorMessage,"Błąd!");
        });
  }

  OnTagSelected(option: MatOption) {
    console.log(option.value);
    this.selectedTag = option.value;
  }

  AutoCompleteDisplay(item: any): any {
    if (item == undefined) { return }
    return item.name;
  }

  ngOnInit(): void {
  }

  openCategoryForm() {
    const modalRef = this.dialog.open(AddCategoryComponent, {
      disableClose: true,
    });
    modalRef.afterClosed().subscribe(res =>{
      this.refresh();
    });
  }

  refresh(): void {
    window.location.reload();
  }
}
