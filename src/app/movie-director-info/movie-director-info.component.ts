import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * @summary Movie director information component to display director information.
 * @class MovieDirectorInfoComponent
 */
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

  /**
   * @summary Closes the open director dialog when the close button is clicked.
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

}
