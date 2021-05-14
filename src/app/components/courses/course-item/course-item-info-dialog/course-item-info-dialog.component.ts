import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseItem } from 'src/app/models/courseItem.model';

@Component({
  selector: 'app-course-item-info-dialog',
  templateUrl: './course-item-info-dialog.component.html',
  styleUrls: ['./course-item-info-dialog.component.css']
})
export class CourseItemInfoDialogComponent implements OnInit {

  courseItem: CourseItem;
  constructor(@Inject(MAT_DIALOG_DATA) public passedData) { }

  ngOnInit(): void {
    this.courseItem = this.passedData.courseItem
    console.log(this.courseItem);
  }

}
