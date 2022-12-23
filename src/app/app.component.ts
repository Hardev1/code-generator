import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralData } from './core/constants/general-data.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup = new FormGroup({});
  coursesDCC: string[] = [];
  teachersDCC: string[] = [];
  periodsDCC: string[] = [];
  titles: string[] = ['MD', 'PhD', 'MSc'];
  maxNumSect = {
    'M': 10,
    'Q': 3,
    'S': 2
  }
  selected = 'Select an option';
  course: string = "";
  teacher: string = "";
  period: string = "";
  digits: boolean = true;

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

  selectCourse() {
    this.course = this.form.controls["selectCourse"].value;
  }

  selectTeacher() {
    this.teacher = this.form.controls["selectTeacher"].value;
  }

  selectPeriod() {
    this.period = this.form.controls["selectPeriod"].value;
  }

  addCourse() {
    let course: string = this.form.controls["course"].value.toUpperCase();
    this.coursesDCC.push(course);
    this.form.controls["course"].setValue("");
  }

  validCourse(): boolean {
    let course: string = this.form.controls["course"].value.toUpperCase();
    let preposition: string = course.slice(0, 3);
    let numberCourse = Number(course.slice(3, 5));
    if (!isNaN(numberCourse) && numberCourse >= 0 && preposition === "DCC" && !this.coursesDCC.includes(course)) {
      return false;
    }
    return true;
  }

  addTeacher() {
    let teacher: string = this.form.controls["teacher"].value;
    this.teachersDCC.push(teacher);
    this.form.controls["teacher"].setValue("");
  }

  validTeacher(): boolean {
    let teacher: string = this.form.controls["teacher"].value;
    let title = teacher.split(" ")[0];
    
    if (this.titles.includes(title) && !this.titles.includes(teacher.trim()) && !this.teachersDCC.includes(teacher) && teacher.length > 1) {
      return false;
    }
    return true;
  }

  addPeriod() {
    let period: string = this.form.controls["period"].value;
    console.log(period.length);
    
    this.periodsDCC.push(period);
    this.form.controls["period"].setValue("");
  }

  validPeriod(): boolean {
    let period: string = this.form.controls["period"].value.toUpperCase();
    let date = new Date().getFullYear();
    let minDate = date - 1;
    let maxDate = date + 1;
    let yearEntered = Number(period.slice(0, 4));
    let section = period.substring(4, 5);
    let numSect = Number(period.substring(5, period.length));

    if (numSect > 0 && numSect <= this.maxNumSect[section] && yearEntered >= minDate && yearEntered <= maxDate && !this.periodsDCC.includes(period)) {
      return false;
    }
    return true;
  }

  generateCodes() {
    let course = this.course;
    let teacher = this.teacher;
    let lastWordNames = teacher.split(" ").map(name => name.split("").slice(name.length - 1, name.length)).join("");
    
    let reversedTitle = teacher.split(" ")[0].split("").reverse().join("");
    let period = this.period;
    let students: number = this.form.controls["students"].value;
    let codes = "";

    for (let i = 1; i <= students; i++) {
      codes = codes +`${course}${reversedTitle}${lastWordNames}-${period}${i.toString().padStart(students.toString().length, '0')}\n`;
    }
    
    this.form.controls["codeGenerated"].setValue(codes);
  }
}