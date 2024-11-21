import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-start',
  templateUrl: './user-start.component.html',
  styleUrls: ['./user-start.component.scss']
})
export class UserStartComponent implements OnInit {

  constructor(
    public router: Router) { }
  ngOnInit(): void {
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

  showBlogs(coursekeyword:any)
  {
    this.router.navigate(["/viewBlogsList",coursekeyword]);
  }

  
  public isCollapsed = false;
  public innerWidth: number = 0;
  public showMobileMenu = false;
  public expandLogo = false;

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

}
