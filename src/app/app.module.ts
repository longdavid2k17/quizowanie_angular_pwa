import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { NewQuizComponent } from './components/new-quiz/new-quiz.component';
import { EditQuizComponent } from './components/edit-quiz/edit-quiz.component';
import { PerformQuizComponent } from './components/perform-quiz/perform-quiz.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from "@angular/material/paginator";
import {ToastrModule} from "ngx-toastr";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewQuizComponent,
    EditQuizComponent,
    PerformQuizComponent
  ],
    imports: [
        BrowserModule,
      HttpClientModule,
      AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        BrowserAnimationsModule,
        MatPaginatorModule,
        ToastrModule.forRoot()
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
