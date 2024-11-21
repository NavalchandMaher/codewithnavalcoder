import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BlogInfo } from '../models/blog-info.model';
import { Blogs } from '../models/blogs.model';
@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private dbPath = '/blogs';
  private bloginfodbPath = '/bloginfo';

  blogRef: AngularFireList<Blogs>;
  blogInfoRef: AngularFireList<BlogInfo>;
  cont:string="";
  constructor(private db: AngularFireDatabase) {
    this.blogRef = db.list(this.dbPath);
    this.blogInfoRef = db.list(this.bloginfodbPath);
   //this.cont="java part 2";
  }

  // getAll(): AngularFireList<Blogs> {
  //   console.log("getAll blogs");
  //   return this.blogRef;

  // }
  
    getBlogByButtonName(buttonname:any): AngularFireList<Blogs>{
      console.log("value getBlogByTitle:- "+buttonname);
      return  this.db.list<Blogs>(this.dbPath, ref => ref.orderByChild('button_name').equalTo(buttonname))//Change this.comments=this.commentsRef.snapshotChanges().pipe(map(actions 
     }

     getBlogInfoByCourseKeyword(coursekeyword:any): AngularFireList<BlogInfo>{
      console.log("value getBlogByTitle:- "+coursekeyword);
      return  this.db.list<BlogInfo>(this.bloginfodbPath, ref => ref.orderByChild('courseKeyword').equalTo(coursekeyword))//Change this.comments=this.commentsRef.snapshotChanges().pipe(map(actions 
     }

  create(blogs: Blogs): any {

    console.log("create blogs :- "+JSON.stringify(blogs));
    return this.blogRef.push({ ...blogs });
  }
  createInfo(blogInfo: BlogInfo): any {
    console.log("value blog in for services :- "+JSON.stringify(blogInfo));

    return this.blogInfoRef.push({ ...blogInfo });
  }

  updateInfo(id: any, data: any): Promise<void> {
    console.log("value blog in for services update array :- "+JSON.stringify(data));

    return this.blogInfoRef.update(id,data);
  }


  update(id: string, data: any): Promise<void> {
    return this.blogRef.update(id,data);
  }

  delete(id: string): Promise<void> {
    return this.blogRef.remove(id)
  }
}
