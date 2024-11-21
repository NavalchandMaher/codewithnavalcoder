import { Component, Inject, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { map } from 'rxjs/operators';
import { BlogComments } from '../models/blog-comments.model';
import { BlogInfo } from '../models/blog-info.model';
import { BloggerBlog } from '../models/blogger-blog.model';
import { BlogsInfoArr } from '../models/blogs-info-arr.model';
import { Blogs } from '../models/blogs.model';
import { Course } from '../models/course.model';
import { BlogsService } from '../service/blogs.service';
import { CommentsService } from '../service/comments.service';
import { CourseService } from '../service/course.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProgessBarBailogComponent } from '../progess-bar-bailog/progess-bar-bailog.component';


@Component({
  selector: 'app-add-blogs',
  templateUrl: './add-blogs.component.html',
  styleUrls: ['./add-blogs.component.scss']
})
export class AddBlogsComponent implements OnInit {
  
  myBlogList?: Blogs[];
  myCourseList:BloggerBlog =new BloggerBlog ;
  blog: Blogs = new Blogs();
  blogInfo: BlogInfo = new BlogInfo();
  myBlogInfoList: BlogInfo = new BlogInfo();
  myBlogInfoList1: BlogInfo = new BlogInfo();

  myBlogInfoarr: BlogsInfoArr = new BlogsInfoArr();
  selectedCourse: Course = new Course();
  blogComment: BlogComments = new BlogComments();
  selectedCourse1:any;
  submitted = false;
  htmlContent1 = '';
  message="";
  initial = false;
  //selectedCourse="JavaFreeCourse";
  searchname:any;

  formTitle="Add Blog";
  addButton=false;
  showForm=false;
  selectedButton:any="";


  constructor(private blogService: BlogsService,
    private courseService: CourseService,
    private commentService: CommentsService,
    public dialog: MatDialog) { }

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '25rem',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
};

  ngOnInit(): void {
    //this.newBlog();
    this.retrieveCourse();
   //this.openDialog();
  }

onChange()
{
  this.retrieveBlogInfo();

}
dialogRef:any;
openDialog(): void {
  this.dialogRef = this.dialog.open(ProgessBarBailogComponent, {
    width: '0px',
    disableClose: true

  });
}

onNoClick(): void {
  this.dialogRef.close();
}


  retrieveCourse(): void {
    this.courseService.getBloggerCourse("navalchandmaher85@gmail.com").snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        ))
    ).subscribe(data => {
      this.myCourseList = <BloggerBlog>data[0];
      console.log("data my course:-" + this.myCourseList);
    });
  }

  addBlog(): void {
    this.initial = true;
    this.blog.courseKeyword=this.selectedCourse1;
    console.log('Program data:- '+JSON.stringify(this.blog));
    this.blogService.create(this.blog).then(() => {
      console.log('Created new item successfully!');
      this.updateBlogInfo();
      this.addComments();
      this.initial = false;
    }).console.error("Blog Not Saved");
    
  }

  addComments()
  {
    this.blogComment = new BlogComments();
      this.blogComment.button_name=this.blog.button_name;
      this.blogComment.courseKeyword=this.blog.courseKeyword;
      this.blogComment.likes="100";
      this.blogComment.sheres="10";
      this.blogComment.comments.push({date:"",userName:"codewithnavaltest",email:"",content:""})

      console.log("comments adding :-"+JSON.stringify(this.blogComment))
      this.commentService.create(this.blogComment).then(() => {
          console.log('comments creatted successfully!');
          this.newBlog();
        });
  }

  
  searchBtn()
  {
   // console.log("Match  Record:- "+JSON.stringify(this.myBlogInfoList.blogInfoArr.filter(btn => btn.button_name?.match(this.searchname))));
   
   this.myBlogInfoList1.blogInfoArr=this.myBlogInfoList.blogInfoArr;
   console.log("search button name:- "+this.searchname)
   this.myBlogInfoList1.blogInfoArr=this.myBlogInfoList1.blogInfoArr.filter(btn => btn.button_name?.toLowerCase()?.match(this.searchname.toLowerCase()));
 
 console.log("Filter Record:- "+JSON.stringify(this.myBlogInfoList1.blogInfoArr));
 
  }

//   addBlogInfo(): void {
//   this.blogInfo=new BlogInfo();
//  // this.blogInfo.author=this.myCourseList?.find(x => x.keyword === this.selectedCourse1)?.author;
//  // this.blogInfo.courseKeyword=this.myCourseList?.find(x => x.keyword === this.selectedCourse1)?.keyword;
//   // this.blogInfo.button_name=this.blog.button_name;
//   // this.blogInfo.publish=this.blog.publish==true? true : false;

//     console.log('addBlogInfo data:- '+JSON.stringify(this.blogInfo));
//     this.blogService.createInfo(this.blogInfo).then(() => {

//        this.submitted = true;
//        this.newBlog();
//     });
//   }

  updateBlogInfo(): void {
    this.initial = true;
      this.myBlogInfoList.blogInfoArr.push({button_name:this.blog.button_name,publish:this.blog.publish==true? true : false});
     this.myBlogInfoList.blogInfoArr=this.myBlogInfoList.blogInfoArr.map((obj)=> {return Object.assign({}, obj)});

     console.log("2323322323 Update info publish :-"+JSON.stringify(this.myBlogInfoList));
     this.blogService.updateInfo(this.myBlogInfoList.id, this.myBlogInfoList)
        .then(() => {this.message = 'The blogs was updated successfully!'
        })
        .catch(err => console.log(err));
        this.initial = false;
  }
  newBlog(): void {
    this.submitted = false;
    this.blog = new Blogs();
    this.formTitle="Add Blog";
    this.addButton=true;
    this.showForm=true;
  }

  retrieveBlogInfo(): void {
    
    this.blogService.getBlogInfoByCourseKeyword(this.selectedCourse1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.myBlogInfoList=<BlogInfo>data[0];
      this.myBlogInfoList
      this.myBlogInfoList.blogInfoArr=this.myBlogInfoList.blogInfoArr.filter(btn => !btn.button_name?.match('demoCodeWithNaval'));
      this.searchBtn();
      console.log("data:-"+this.myBlogInfoList);
    });
    
  }

  retrieveBlog(bloginfo:any): void {
    this.openDialog();
    this.blogService.getBlogByButtonName(bloginfo).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.blog=<Blogs>data[0];
      console.log("data:-"+this.myBlogList);
      this.onNoClick();
    });
    
  }
  setActiveBlog(bloginfoButton:any): void {
 
   this.selectedButton=bloginfoButton;
   console.log("selected button name:-"+this.selectedButton);

   this.retrieveBlog(bloginfoButton);
   this.formTitle="Update Course";
    this.addButton=false;
    this.showForm=true;
   
    
  }

  updateBlogs(): void {
    this.initial = true;
    if (this.blog.id) {
      this.blogService.update("" + this.blog.id, this.blog)
        .then(() => {this.message = 'The blogs was updated successfully!'
        this.newBlog();
        })
        .catch(err => console.log(err));

      //  this.myBlogInfoList.blogInfoArr= this.myBlogInfoList.blogInfoArr.filter(btn => !btn.button_name?.includes(""+this.blog.button_name));
        
        var objIndex = this.myBlogInfoList.blogInfoArr.findIndex((obj => obj.button_name?.includes(""+this.blog.button_name)));

        console.log("Value of index:----"+objIndex);
        console.log("Value of Publish:----"+this.blog.publish);

        console.log("Value of Publish old:----"+JSON.stringify(this.myBlogInfoList));

        this.myBlogInfoList.blogInfoArr[objIndex].publish=this.blog.publish==true? true : false;

        console.log("-------------------"+JSON.stringify(this.myBlogInfoList));
         this.blogService.updateInfo(this.myBlogInfoList.id, this.myBlogInfoList)
         .then(() => {this.message = 'The blogs was updated successfully!'
         this.initial = false;
         })
         .catch(err => console.log(err));
    }
  }

  deleteBlogs(): void {
    this.initial = true;
    if (this.blog.id) {
      this.blogService.delete("" + this.blog.id)
        .then(() => {
          //this.refreshList.emit();
          this.newBlog();
          this.retrieveBlogInfo();
          this.message = 'The blogs was updated successfully!';
        })
        .catch(err => console.log(err));
          this.myBlogInfoList.blogInfoArr= this.myBlogInfoList.blogInfoArr.filter(btn => !btn.button_name?.includes(""+this.blog.button_name));
         
         console.log(JSON.stringify(this.myBlogInfoList));
          this.blogService.updateInfo(this.myBlogInfoList.id, this.myBlogInfoList)
          .then(() => {this.message = 'The blogs was updated successfully!'
          this.initial = false;
          })
          .catch(err => console.log(err));       
    }
  }

}

