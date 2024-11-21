import { Injectable, Output,Input,EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs';
//import { EventEmitter } from 'stream';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  invokeFirstComponentFunction = new EventEmitter();    
  //subsVar: Subscription;   
  constructor() {
    console.log('shared service started');
   }

   onFirstComponentButtonClick() {    
    this.invokeFirstComponentFunction.emit();    
  }   

  routrURL='';

  getRoutrUrl():any
  {
    return this.routrURL;
  }
  setRouteUrl(url:any)
  {
    console.log("call set url");
      this.routrURL=url;
  }

}
