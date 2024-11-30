import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-director-info',
  templateUrl: './movie-director-info.component.html',
  styleUrls: ['./movie-director-info.component.scss']
})
export class MovieDirectorInfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MovieDirectorInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      Name: string,
      Bio: string,
      Birth: string
    }
    ) { }

  ngOnInit(): void {
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
