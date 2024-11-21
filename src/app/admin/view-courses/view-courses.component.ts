import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.scss']
})
export class ViewCoursesComponent implements OnInit {


  myCourseList?: Course[];
  constructor(private courseService: CourseService,
    public router: Router) { }

  ngOnInit(): void {
    this.retrieveCourse();
  }

  showBlogs(coursekeyword:any)
  {
    this.router.navigate(["/viewBlogsList",coursekeyword]);
  }

  retrieveCourse(): void {
    this.courseService.getPublishCourse().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(data => {
      this.myCourseList = <Course[]>data;
      console.log("data:-" + this.myCourseList);
    });
  }

}
