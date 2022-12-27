import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseComponent } from './shared/components/course/course.component';
import { TeacherComponent } from './shared/components/teacher/teacher.component';
import { PeriodComponent } from './shared/components/period/period.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    TeacherComponent,
    PeriodComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
