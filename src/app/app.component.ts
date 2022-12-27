import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralData } from './core/constants/general-data.constants';
import { Course } from './modules/module-a/models/course.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup = new FormGroup({});
  courses: Course[] = [];
  coursesDCC: string[] = [];
  teachersDCC: string[] = [];
  periodsDCC: string[] = [];
  titles: string[] = ['MD', 'PhD', 'MSc'];
  maxNumSect = {
    'M': 10,
    'Q': 3,
    'S': 2
  }

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.CreateForm();
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
    this.coursesDCC.push(`${courseObj.departOrFac}${courseObj.noCourse}`);
    this.form.controls["course"].setValue("");
  }

  isValidCourse(): boolean {
    let course: string = this.form.controls["course"].value.toUpperCase();
    let departOrFac: string = course.slice(0, 3);
    let numberCourse = Number(course.slice(3, 5));

    return !(!isNaN(numberCourse) && numberCourse >= 0 && departOrFac === "DCC" 
    && !this.coursesDCC.includes(course))
  }



  addTeacher() {
    const { teacher } = this.form.value;
    this.teachersDCC.push(teacher);
    this.form.controls["teacher"].setValue("");
  }

  isValidTeacher(): boolean {
    const { teacher } = this.form.value;
    let title = teacher.split(" ")[0];

    return !(this.titles.includes(title) && !this.titles.includes(teacher.trim()) 
    && !this.teachersDCC.includes(teacher) && teacher.length > 1)
  }

  addPeriod() {
    const { period } = this.form.value;
    this.periodsDCC.push(period);
    this.form.controls["period"].setValue("");
  }

  isValidPeriod(): boolean {
    let period: string = this.form.controls["period"].value.toUpperCase();
    let date = new Date().getFullYear();
    let yearEntered = Number(period.slice(0, 4));
    let section = period.substring(4, 5);
    let numSect = Number(period.substring(5, period.length));
    return !(numSect > 0 && numSect <= this.maxNumSect[section] && yearEntered >= date-1 
      && yearEntered <= date+1 && !this.periodsDCC.includes(period));
  }

  generateCodes() {
    const { selectCourse: course, selectPeriod: period, selectTeacher: teacher, students } = this.form.value;
    let lastWordNames = teacher.split(" ").map((name: string) => name.split("")
      .slice(name.length - 1, name.length)).join("");
    let reversedTitle = teacher.split(" ")[0].split("").reverse().join("");
    let codes = "";
    for (let i = 1; i <= students; i++) {
      codes = codes + `${course}${reversedTitle}${lastWordNames}-${period}${i.toString()
        .padStart(students.toString().length, '0')}\n`;
    }
    this.form.controls["codeGenerated"].setValue(codes);
  }
}