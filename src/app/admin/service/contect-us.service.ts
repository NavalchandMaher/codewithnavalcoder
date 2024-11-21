import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ContactUs } from '../models/contact-us.model';

@Injectable({
  providedIn: 'root'
})
export class ContectUsService {

  private dbPath = '/contactUs';

  commentRef: AngularFireList<ContactUs>;

  cont:string="";
  constructor(private db: AngularFireDatabase) {
    this.commentRef = db.list(this.dbPath);
   //this.cont="java part 2";
  }

  // getAll(): AngularFireList<ContactUs> {
  //   console.log("contact us get all");
  //   return this.commentRef;
  // }

  create(contachUs: ContactUs): any {

    console.log("add comments :---"+JSON.stringify(contachUs))
    return this.commentRef.push({ ...contachUs });
  }
  update(id: string, data: any): Promise<void> {
    console.log("contact us update");
    return this.commentRef.update(id,data);
  }

}
