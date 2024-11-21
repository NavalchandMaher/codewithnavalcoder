import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BlogComments } from '../models/blog-comments.model';
import { Blogs } from '../models/blogs.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private dbPath = '/comments';

  commentRef: AngularFireList<BlogComments>;

  cont:string="";
  constructor(private db: AngularFireDatabase) {
    this.commentRef = db.list(this.dbPath);
   //this.cont="java part 2";
  }

  // getAll(): AngularFireList<BlogComments> {

  //   console.log("get all comments");
  //   return this.commentRef;
    
  // }
  // firebase.database().ref('/tests')
  // .orderByChild("serie").equalTo("0")
  // .on('value',(data: DataSnapshot) => {
  //   data.forEach((child: DataSnapshot) => {
  //     console.log(child.key, child.val());
  //   });
  // }
//   getButtonName(buttonname:any): AngularFirestoreCollection<Blogs> {
//     return  this.db.collection<Blogs>(this.dbPath, ref => ref.orderByChild
//   }

//   getUsername() {
//     this.db.collection(someUID).subscribe(
//        (data) => this.username = data.exists ? data.data().username : undefined
//     }
//  }


  //  onQuery(): AngularFirestoreCollection<Blogs>{
  //    return  this.db.collection<Blogs>(this.dbPath, ref => ref.where('title', '==', 'java part 2'))//Change this.comments=this.commentsRef.snapshotChanges().pipe(map(actions 
  //   }

    getCommentsByBlogs(buttonname:any): AngularFireList<BlogComments>{
      console.log("getCommentsByBlogs");
      return  this.db.list<BlogComments>(this.dbPath, ref => ref.orderByChild('button_name').equalTo(buttonname))//Change this.comments=this.commentsRef.snapshotChanges().pipe(map(actions 
     }

  create(comments: BlogComments): any {

    console.log("add comments :---"+JSON.stringify(comments))
    return this.commentRef.push({ ...comments });
  }

  update(id: string, data: any): Promise<void> {
    console.log("   update  Comments Blogs");
    return this.commentRef.update(id,data);
  }

}
