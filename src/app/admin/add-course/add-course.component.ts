import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { BlogInfo } from '../models/blog-info.model';
import { BloggerBlogArr } from '../models/blogger-blog-arr.model';
import { BloggerBlog } from '../models/blogger-blog.model';
import { BlogsInfoArr } from '../models/blogs-info-arr.model';
import { Course } from '../models/course.model';
import { BlogsService } from '../service/blogs.service';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

 // myCourseList:Course=new Course();
  currentIndex = -1;
  course: Course = new Course();
  blogInfo: BlogInfo = new BlogInfo();
  bloggerBlog: BloggerBlog = new BloggerBlog();
  blogInfoarr1: BlogsInfoArr = new BlogsInfoArr();

  formTitle = "Add Course";
  addButton = false;
  message = '';
  submitted = false;
  constructor(private courseService: CourseService,
              private  blogService: BlogsService
    ) {
  }
  ngOnInit(): void {
    this.message = '';
    this.retrieveCourse();
    this.newCourse();
  }

  url: any = '';
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.course.image = event.target?.result;
        this.url = event.target?.result;
      }
    }
  }

setKeyword()
{
  this.course.keyword=this.course.title?.replace(/\s/g, '');
}

  addCourse(element: any): void {
    console.log('Course  data:- ' + JSON.stringify(this.course));
    this.courseService.create(this.course).then(() => {
      console.log('Created new item successfully!');
      this.blogInfo.courseKeyword=this.course.keyword;
      this.blogInfo.author=this.course.author;
      this.blogInfo.blogInfoArr.push({button_name:"demoCodeWithNaval",publish:false});
      this.blogService.createInfo(this.blogInfo).then(() => {
       this.submitted = true;
      element.value = "";
      //this.newCourse();
    });
    console.log("print retrieve Course value"+JSON.stringify(this.bloggerBlog));
    
    this.bloggerBlog.email="navalchandmaher85@gmail.com";
    this.bloggerBlog.userid="naval@123";
   
    this.bloggerBlog.bloggerBlogArr.push({keyword:""+this.course.keyword,title:""+this.course.title});
    this.bloggerBlog.bloggerBlogArr = this.bloggerBlog.bloggerBlogArr.map((obj)=> {return Object.assign({}, obj)});
    if(this.bloggerBlog.bloggerBlogArr.length==1)
    {
    console.log(JSON.stringify(this.bloggerBlog));
    console.table(this.bloggerBlog);
    this.courseService.createBloggerCourse(this.bloggerBlog)
    .then(() => {
      this.submitted = true;
     element.value = "";
     this.newCourse();
     this.retrieveCourse();
   });
  }
  else{
    this.courseService.updateBloggerCourse(this.bloggerBlog.id,this.bloggerBlog).then(() => {
      this.submitted = true;
     element.value = "";
     this.newCourse();
   });
  }
    });
  }
  
  newCourse(): void {
    this.submitted = false;
    this.course = new Course();
    this.formTitle = "Add Course";
    this.addButton = true;
    this.url = '';
  }

  retrieveCourse(): void {
    this.courseService.getBloggerCourse("navalchandmaher85@gmail.com").snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      if(data[0].email!=undefined)
      {
        this.bloggerBlog = <BloggerBlog>data[0];
      }
      console.log("Course Value----"+JSON.stringify(this.bloggerBlog))
    });
  }

  retrieveCourseByKeyword(keyword:any): void {
    this.courseService.getAuthorCourse(keyword).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.course = <Course>data[0];
    });
  }
  setActiveCourse(keyword: any): void {
   
    this.formTitle = "Update Course";
    this.addButton = false;
    this.retrieveCourseByKeyword(keyword);
  }
  updateCourse(element: any): void {
    if (this.course.id) {
      this.courseService.update("" + this.course.id, this.course)
        .then(() => {
          this.message = 'The Course  was updated successfully!'
          this.newCourse();
          element.value = "";
        })
        .catch(err => { console.log(err) });
    }
  }
  deleteCourse(): void {
    if (this.course.id) {
      this.courseService.delete("" + this.course.id)
        .then(() => {
          this.retrieveCourse();
          this.newCourse();
          this.message = 'The Course was Deleted successfully!';
        })
        .catch(err => console.log(err));


       this.bloggerBlog.bloggerBlogArr= this.bloggerBlog.bloggerBlogArr.filter(btn => !btn.keyword?.includes(""+this.course.keyword));
     
       console.log(JSON.stringify(this.bloggerBlog));
         this.courseService.updateBloggerCourse(this.bloggerBlog.id,this.bloggerBlog).then(() => {
           //this.submitted = true;
          //element.value = "";
          this.newCourse();
        });
    }
  }
}
