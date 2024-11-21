import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BlogComments } from '../models/blog-comments.model';
import { Blogs } from '../models/blogs.model';
import { Comment } from '../models/comment.model';
import { ProgessBarBailogComponent } from '../progess-bar-bailog/progess-bar-bailog.component';
import { BlogsService } from '../service/blogs.service';
import { CommentsService } from '../service/comments.service';
import { SharedServiceService } from '../service/shared-service.service';
import { ViewBlogListComponent } from '../view-blog-list/view-blog-list.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
declare var hljs: any;
@Component({
  selector: 'app-view-blog-details',
  templateUrl: './view-blog-details.component.html',
  styleUrls: ['./view-blog-details.component.scss']
})
export class ViewBlogDetailsComponent implements OnInit {

  currentblogs: Blogs = new Blogs();

 // commentBlogList?: BlogComments[];
  message = '';
  buttonname='';
  blogComment: BlogComments = new BlogComments();
  updateblogComment: BlogComments = new BlogComments();
  prograssBarStatus=false;

  comment: Comment = new Comment();
  constructor(private blogsService: BlogsService,
    public router: Router,
    private route: ActivatedRoute,
    private eltRef:ElementRef,
    private commentService: CommentsService,
    public datepipe: DatePipe,
    public sharedService:SharedServiceService,
    public blogList:ViewBlogListComponent
    ) {

      router.events.subscribe((val) => {
        // see also 
       // console.log(val instanceof NavigationEnd)
        this.buttonname= ""+this.route.snapshot.paramMap.get('buttonname');
        if(this.blogList.getSelectedButton()!=null)
        {
           this.buttonname=this.blogList.getSelectedButton();
        }
       // console.log("selected button:----"+this.buttonname);
        if(!this.blogList.routeSet)
        {
          console.log("Unique button:----"+this.buttonname);
          this.blogList.changeRoutes();
          this.retrieveBlogs(this.buttonname); 
        }    
    });
     }
     date:Date=new Date;
     postcomment=false;
     giveComment()
     {
      this.postcomment=true;
       if (this.blogComment.id) {
        // console.log("calling update");

         this.blogComment.comments.push(this.comment);
         this.blogComment.comments = this.blogComment.comments.map((obj)=> {return Object.assign({}, obj)});       
        this.commentService.update("" + this.blogComment.id, this.blogComment)
          .then(() => {this.message = 'comments updated successfully!'
          this.comment=new Comment();
          this.postcomment=false;
          })
          .catch(err => console.log(err));
      }
      }   
      retrieveComments(buttonname:any): void {
        this.commentService.getCommentsByBlogs(buttonname).snapshotChanges().pipe(
          map(changes =>
            changes.map(c =>
              ({ id: c.payload.key, ...c.payload.val() })
            )
          )
        ).subscribe(data => {
        //  console.log("return all befose assign comments data view:-"+JSON.stringify(data));
          this.blogComment=<BlogComments>data[0];
          this.blogComment.comments= this.blogComment.comments.filter(btn => !btn.userName?.includes("codewithnavaltest"));
         
         // console.log("return all comments data view:-"+JSON.stringify(this.blogComment));
          //this.blogList.onActivate();
        });
      }

      preButton:boolean=false;
      nextButton:boolean=false;
      checkButtonStatus()
      {
        this.preButton=true;
        this.nextButton=true;
        if(this.blogList.checkSelectedIndex()==0)
        {
         // this.blogList.onActivate();
          this.preButton=false;
        }
        if(this.blogList.checkSelectedIndex()==this.blogList.totalSizeIndex())
        {
          this.nextButton=false;
          //this.blogList.onActivate();
        }
      }
      previousBtn()
      {
        var size=this.blogList.checkSelectedIndex();
        this.blogList.preButton(size);
      }
      nextBtn()
      {
        var size=this.blogList.checkSelectedIndex();
        this.blogList.nextButton(size);
      }
    copyMessage(val: string){
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }
  ngOnInit(): void {
    this.message = '';
  }
  retrieveBlogs(buttonname:any): void {
    console.log("retrieveBlogs");
    this.currentblogs=new Blogs();
    this.blogComment= new BlogComments();
   // console.log("get button name:- "+buttonname);
    this.blogsService.getBlogByButtonName(buttonname).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.currentblogs=<Blogs>data[0];
    //  console.log(" data view:-"+JSON.stringify(this.currentblogs));
      this.retrieveComments(buttonname);
      this.blogList.closeProgessBar();
      this.blogList.hideSidebar();
    this.checkButtonStatus();
    //this.blogList.onActivate();
    });
    
  }
}
