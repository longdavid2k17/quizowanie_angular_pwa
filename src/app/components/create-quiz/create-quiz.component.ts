import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {TagsService} from "../../services/tags.service";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  form: any = {
    name: null,
    description: null,
    category:null,
    tags:null
  };
  myControl = new FormControl();

  selectedCategory:any;
  categories:any[] = [];
  tags:any[] = [];

  constructor(private tagsService:TagsService,private categoryService:CategoryService) { }

  onSubmit(): void {
    const {name, description,category,tags} = this.form;
  }

  ngOnInit(): void {
    this.tagsService.getAll().subscribe(res => {
      // @ts-ignore
      this.tags = res;
    },error => {
      console.log(error.error)
    });
    this.categoryService.getAll().subscribe(res => {
      // @ts-ignore
      this.categories = res;
    },error => {
      console.log(error.error)
    });
  }

}
