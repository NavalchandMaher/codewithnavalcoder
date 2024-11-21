import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BloggerBlog } from '../models/blogger-blog.model';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private dbPath = '/course';
  private dbBloggerPath = '/bloggerCourse';

  courseRef: AngularFireList<Course>;
  courseBlogRef: AngularFireList<BloggerBlog>;

  cont:string="";
  constructor(private db: AngularFireDatabase) {
    this.courseRef = db.list(this.dbPath);
    this.courseBlogRef = db.list(this.dbBloggerPath);
   //this.cont="java part 2";
  }

  // getAll(): AngularFireList<Course> {
  // console.log("get all course");
  //   return this.courseRef; 
  // }

    getPublishCourse(): AngularFireList<Course>{
      console.log("getgetPublishCourse");
      return  this.db.list<Course>(this.dbPath, ref => ref.orderByChild('publish').equalTo(true))//Change this.comments=this.commentsRef.snapshotChanges().pipe(map(actions 
     }


     getAuthorCourse(keyword:any): AngularFireList<Course>{
      console.log("getAuthorCourse");
      return  this.db.list<Course>(this.dbPath, ref => ref.orderByChild('keyword').equalTo(keyword))//Change this.comments=this.commentsRef.snapshotChanges().pipe(map(actions 
     }

  create(course: Course): any {
    return this.courseRef.push({ ...course });
  }

  // createId() {
  //    return  this.db.list('course').valueChanges({ idField: 'id' });
  // }

  update(id: string, data: any): Promise<void> {
    console.log("Update Course");
    return this.courseRef.update(id,data);
  }

  createBloggerCourse(bloggercourse: BloggerBlog): any {
    console.log("createBloggerCourse");
    return this.courseBlogRef.push({ ...bloggercourse });
  }

  getBloggerCourse(email:any): AngularFireList<BloggerBlog>{
    console.log("getBloggerCourse");
    return  this.db.list<BloggerBlog>(this.dbBloggerPath, ref => ref.orderByChild('email').equalTo(email))//Change this.comments=this.commentsRef.snapshotChanges().pipe(map(actions 
   }

  updateBloggerCourse(id: any, data: any): Promise<void> {
    console.log("updateBloggerCourse");
    return this.courseBlogRef.update(id,data);
  }

  delete(id: string): Promise<void> {
    return this.courseRef.remove(id);
  }
}
