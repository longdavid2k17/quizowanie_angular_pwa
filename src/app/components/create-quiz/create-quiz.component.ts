import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {TagsService} from "../../services/tags.service";
import {CategoryService} from "../../services/category.service";
import {QuizService} from "../../services/quiz.service";
import {ToastrService} from "ngx-toastr";
import {map, Observable, startWith} from "rxjs";
import {MatOption} from "@angular/material/core";

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  form: any = {
    name: null,
    description: null,
    tags:null
  };
  myControl = new FormControl();
  errorMessage='';
  selectedCategory:any;
  selectedTag:any;
  categories:any[] = [];
  tagsDB:any[] = [];
  filteredTags: Observable<any[]>;

  constructor(private tagsService:TagsService,
              private categoryService:CategoryService,
              private quizService:QuizService,
              private toastr:ToastrService) {
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
    const {name, description} = this.form;
    if(this.selectedCategory)
    {
      this.errorMessage = '';
      this.quizService.save(name,description,this.selectedCategory,this.selectedTag).subscribe(res=>{
          this.toastr.success("Poprawnie zapisano nowy quiz!","Sukces!")
        },
        error => {
          this.toastr.error(error.errorMessage,"Błąd!");
        })
    }
    else {
      this.errorMessage = 'Brak wybranej kategorii!';
    }
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

}
