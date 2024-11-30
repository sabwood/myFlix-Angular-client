import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-description-info',
  templateUrl: './movie-description-info.component.html',
  styleUrls: ['./movie-description-info.component.scss']
})
export class MovieDescriptionInfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MovieDescriptionInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      Description: string
    }
  ) { }

  ngOnInit(): void {
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
