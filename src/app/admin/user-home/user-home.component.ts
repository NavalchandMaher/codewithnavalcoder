import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ContactUs } from '../models/contact-us.model';
import { Course } from '../models/course.model';
import { ContectUsService } from '../service/contect-us.service';
//import { ContectUsService } from '../service/contect-us.service';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

 
  myCourseList?: Course[];
  contact: ContactUs = new ContactUs();

  constructor(private courseService: CourseService,
    private contactUs: ContectUsService,
    public router: Router) { }
  ngOnInit(): void {
    this.retrieveCourse();
  }

  headercolor:any;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
   const n = event.srcElement.scrollingElement.scrollTop;
  if(n>5)
  {
    this.headercolor="background-color: #ddddcf"
  }
  else{
    this.headercolor="";
  }
  }

  routeSet=false;

  showBlogs(coursekeyword:any)
  {
    console.log("click to select course :- "+coursekeyword);
    this.routeSet=false;
    this.router.navigate(["/viewBlogsList",coursekeyword]);
  }
  changeRoutes()
  {
    this.routeSet=true;
  }

  retrieveCourse(): void {
    this.courseService.getPublishCourse().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.myCourseList = <Course[]> data;
      console.log("data:-" + this.myCourseList);
    });
  }


  addContactUs()
  {
      this.contactUs.create(this.contact).then(() => {
          console.log('comments creatted successfully!');
          this.contact=new ContactUs();
        });
  }

  public isCollapsed = false;
  public innerWidth: number = 0;
  public showMobileMenu = false;
  public expandLogo = false;

  Logo() {
    this.expandLogo = !this.expandLogo;
  }
}
