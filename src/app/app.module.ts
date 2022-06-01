import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { PerformQuizComponent } from './components/perform-quiz/perform-quiz.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from "@angular/material/paginator";
import {ToastrModule} from "ngx-toastr";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import { QuizComponent } from './components/quiz/quiz.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddTagsComponent } from './components/add-tags/add-tags.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { QuestionsEditFormComponent } from './components/questions-edit-form/questions-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PerformQuizComponent,
    QuizComponent,
    CreateQuizComponent,
    AddCategoryComponent,
    AddTagsComponent,
    AddQuestionComponent,
    QuestionsEditFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    BrowserAnimationsModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    DragDropModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }