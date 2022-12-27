import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralData } from 'src/app/core/constants/general-data.constants';
import { Course } from 'src/app/modules/module-a/models/course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  courses: Course[] = [];
  coursesDCC: string[] = [];
  @Output() asda: EventEmitter<Course> = new EventEmitter<Course>();

  constructor(
    private fb: FormBuilder,
    ) { }

  ngOnInit() {
  }

  CreateForm() {
    this.form = this.fb.group({
      course: ['DCC12',
        [
          Validators.required,
          Validators.minLength(GeneralData.COURSE_VALID_LENGHT),
          Validators.maxLength(GeneralData.COURSE_VALID_LENGHT)
        ],],
      teacher: ['MD Xavi Puig Gaudí', Validators.required],
      period: ['2022M10', Validators.required],
      students: ['1000', Validators.required],
      selectCourse: ['', Validators.required],
      selectTeacher: ['', Validators.required],
      selectPeriod: ['', Validators.required],
      codeGenerated: [''],
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  addCourse() {
    let course: string = this.form.controls["course"].value.toUpperCase();
    let departOrFac: string = course.slice(0, 3);
    let numberCourse = Number(course.slice(3, 5));
    let courseObj = new Course(departOrFac, numberCourse);
    this.courses.push(courseObj);
    console.log(this.courses);
    this.asda.emit(courseObj);
    
    this.coursesDCC.push(`${courseObj.departOrFac}${courseObj.noCourse}`);
    this.form.controls["course"].setValue("");
  }

  validCourse(): boolean {
    let course: string = this.form.controls["course"].value.toUpperCase();
    let departOrFac: string = course.slice(0, 3);
    let numberCourse = Number(course.slice(3, 5));

    if (!isNaN(numberCourse) && numberCourse >= 0 && departOrFac === "DCC" && !this.coursesDCC.includes(course)) {
      return false;
    }
    return true;
  }
}
