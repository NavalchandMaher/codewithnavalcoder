import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-progess-bar-bailog',
  templateUrl: './progess-bar-bailog.component.html',
  styleUrls: ['./progess-bar-bailog.component.scss']
})
export class ProgessBarBailogComponent {

    constructor(
      public dialogRef: MatDialogRef<ProgessBarBailogComponent>
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
