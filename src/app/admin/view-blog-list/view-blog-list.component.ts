import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { timer } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';
import { BlogInfo } from '../models/blog-info.model';
import { Blogs } from '../models/blogs.model';
import { BlogsService } from '../service/blogs.service';
import { SharedServiceService } from '../service/shared-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProgessBarBailogComponent } from '../progess-bar-bailog/progess-bar-bailog.component';
import { UserHomeComponent } from '../user-home/user-home.component';
const minute = (1000 * 1)/4;

@Component({
  selector: 'app-view-blog-list',
  templateUrl: './view-blog-list.component.html',
  styleUrls: ['./view-blog-list.component.scss']
})
export class ViewBlogListComponent implements OnInit {

 
  
  myBlogs?: Blogs[];
  myBlogInfoList: BlogInfo = new BlogInfo();

  myBlogInfoList1: BlogInfo = new BlogInfo();
  currentBlogs?: Blogs;
  currentIndex = -1;
  title = '';
  coursekeyword='';

  searchname='';

  initial = false;
  selectedButton:any;

  constructor(private blogsService: BlogsService,
    public router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public userhome: UserHomeComponent
    ) {

      router.events.subscribe((val) => {
        // see also 
       // console.log(val instanceof NavigationEnd)
        this.coursekeyword= ""+this.route.snapshot.paramMap.get('course');
       // console.log("button name list component:- "+this.coursekeyword)
        //this.retrieveProgram(this.coursekeyword); 
       // console.log("button keyword:- "+this.coursekeyword);
        //console.log("URL keyword:- "+this.sharedService.getRoutrUrl());
       // console.log("check status--"+this.userhome.routeSet)

        if(!this.userhome.routeSet)
        {
          this.userhome.changeRoutes();
          console.log("Unique call:- "+this.coursekeyword)
          this.retrieveBlogInfo();  
        }
    });
    
     }
  ngOnInit(): void {
    //this.retrieveBlogInfo();
    // if (this.router.url === "/") {
    //   this.router.navigate(["/dashboard"]);
    // }
   // this.defaultSidebar = this.sidebartype;
   // this.handleSidebar();
  //  if (this.sharedService.subsVar==undefined) {    
  //   this.sharedService.subsVar = this.sharedService.    
  //   invokeFirstComponentFunction.subscribe((name:string) => {    
  //     this.closeProgessBar();    
  //   });    
  // }    

  }

  searchBtn()
  {
   // console.log("Match  Record:- "+JSON.stringify(this.myBlogInfoList.blogInfoArr.filter(btn => btn.button_name?.match(this.searchname))));
   
   this.myBlogInfoList1.blogInfoArr=this.myBlogInfoList.blogInfoArr;
//   console.log("search button name:- "+this.searchname)
   this.myBlogInfoList1.blogInfoArr=this.myBlogInfoList1.blogInfoArr.filter(btn => btn.button_name?.toLowerCase()?.match(this.searchname.toLowerCase()));
 
 //console.log("Filter Record:- "+JSON.stringify(this.myBlogInfoList1.blogInfoArr));
 
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

  dialogRef:any;
openDialog(): void {
  this.dialogRef = this.dialog.open(ProgessBarBailogComponent, {
    width: '0px',
   disableClose: true
  });
}

onNoClick(): void {
  this.dialogRef.close();
  timer(minute).subscribe(this.onActivate);
}
  
closeProgessBar():any
{
 // console.log("change prograss bar :-"+this.initial);
  this.initial=false;
  this.onNoClick();
  }

preButton(objIndex:any)
{
  //var objIndex = this.myBlogInfoList.blogInfoArr.findIndex((obj => obj.button_name?.includes(this.selectedButton)));
  this.setActiveBlog(this.myBlogInfoList.blogInfoArr[objIndex-1].button_name);
}
nextButton(objIndex:any)
{
 // var objIndex = this.myBlogInfoList.blogInfoArr.findIndex((obj => obj.button_name?.includes(this.selectedButton)));
  this.setActiveBlog(this.myBlogInfoList.blogInfoArr[objIndex+1].button_name);
}

checkSelectedIndex():any
{
  return this.myBlogInfoList.blogInfoArr.findIndex((obj => obj.button_name?.includes(this.selectedButton)));
}


onActivate() {
  console.log("scroll to top start");
  window.scroll({ 
    top: 0, 
    left: 0, 
    behavior: 'smooth' 
});
console.log("scroll to top stop");
}

totalSizeIndex():any
{
  return this.myBlogInfoList.blogInfoArr.length-1;
}
routeSet=false;

changeRoutes()
  {
    this.routeSet=true;
  }
  setActiveBlog(button_name:any): void {
    this.openDialog();
    this.initial=true;
   // console.log("view blog list :- "+button_name);
    this.selectedButton=button_name;
    this.routeSet=false;
    this.router.navigate(["/viewBlogsList/"+this.coursekeyword+"/",button_name]);
  }

  public getSelectedButton():any
  {
      return this.selectedButton;
  }

  retrieveBlogInfo(): void {
    console.log("call retrieveBlogInfo");
    this.openDialog();
    this.blogsService.getBlogInfoByCourseKeyword(this.coursekeyword).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(data => {
      this.myBlogInfoList=<BlogInfo>data[0];
      this.myBlogInfoList.blogInfoArr=this.myBlogInfoList.blogInfoArr.filter(btn => btn.publish==true);
 
    //console.log("Print Data:--"+JSON.stringify(this.myBlogInfoList));
    this.closeProgessBar();
      //this.myBlogInfoList1=data[0];
     this.setActiveBlog(""+this.myBlogInfoList.blogInfoArr[0].button_name);
    //  console.log("data:-"+this.myBlogInfoList);
      this.searchBtn();
    });
  }




  public isCollapsed = false;
  public innerWidth: number = 0;
  public defaultSidebar: string = "";
  public showMobileMenu = true;
  public expandLogo = false;
  public sidebartype = "full";
  //public inPrograsBar

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.handleSidebar();
  }

  hideSidebar()
  {
    this.showMobileMenu=false;
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.sidebartype = "full";
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case "full":
        this.sidebartype = "mini-sidebar";
        break;

      case "mini-sidebar":
        this.sidebartype = "full";
        break;

      default:
    }
  }


}
