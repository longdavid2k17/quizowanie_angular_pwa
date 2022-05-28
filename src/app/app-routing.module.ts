import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {CreateQuizComponent} from "./components/create-quiz/create-quiz.component";
import {AddQuestionComponent} from "./components/add-question/add-question.component";

const routes: Routes = [
  { path: 'add-questions/:id', component: AddQuestionComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreateQuizComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
