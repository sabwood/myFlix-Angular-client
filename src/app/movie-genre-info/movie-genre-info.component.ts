import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-genre-info',
  templateUrl: './movie-genre-info.component.html',
  styleUrls: ['./movie-genre-info.component.scss']
})
export class MovieGenreInfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MovieGenreInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      Name: string,
      Description: string
    }
  ) { }

  ngOnInit(): void {
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
