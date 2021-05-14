import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseItem } from 'src/app/models/courseItem.model';

@Component({
  selector: 'app-course-item-details',
  templateUrl: './course-item-details.component.html',
  styleUrls: ['./course-item-details.component.css']
})
export class CourseItemDetailsComponent implements OnInit {

  ingredients: string[];
  courseItem: CourseItem
  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData) { }

  ngOnInit(): void {
    this.courseItem = this.passedData.courseItem;
    this.createIngredientsArray()
  }

  createIngredientsArray() {
    this.ingredients = this.courseItem.description.split(',').map(str => str.trim())
  }
}
