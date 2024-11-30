import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MovieDescriptionInfoComponent } from '../movie-description-info/movie-description-info.component';
import { MovieDirectorInfoComponent } from '../movie-director-info/movie-director-info.component';
import { MovieGenreInfoComponent } from '../movie-genre-info/movie-genre-info.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  FavoriteMovies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router,
    public dialog: MatDialog
  ) {
    this.userData = JSON.parse(localStorage.getItem("user") || "")
  }

  ngOnInit(): void {
    this.getUser();
    this.getUserFavoriteMovies();    
  }

  getUser(): void {
    this.fetchApiData.getUser(this.userData.Username).subscribe((resp: any) => {
      this.userData = {
        ...resp,
        id: resp._id,
        Username: this.userData.Username,
        Password: this.userData.Password,
        Email: this.userData.Email,
        Birthday: this.userData.Birthday,
        token: this.userData.token
      };
      localStorage.setItem("user", JSON.stringify(this.userData));
    });
  }

  editUser(): void {
    this.fetchApiData.editUser(this.userData.Username, this.userData).subscribe((resp: any) => {
      this.userData = {
        ...resp,
        id: resp._id,
        Username: this.userData.Username,
        Password: this.userData.Password,
        Email: this.userData.Email,
        Birthday: this.userData.Birthday,
        FavoriteMovies: this.userData.FavoriteMovies,
        token: this.userData.token
      };
      localStorage.setItem("user", JSON.stringify(this.userData))
    });
  }

  getUserFavoriteMovies(): void {
    this.fetchApiData.getUser(this.userData.FavoriteMovies).subscribe((resp: any) => {
      this.userData = {
        ...resp,
        id: resp._id,
        Username: this.userData.Username,
        Password: this.userData.Password,
        Email: this.userData.Email,
        Birthday: this.userData.Birthday,
        FavoriteMovies: this.userData.FavoriteMovies,
        token: this.userData.token
      };
      return this.userData.FavoriteMovies;
    })
  }

  isFavoriteMovie(MovieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(MovieID) >= 0;
  }

  openDirectorDialog(Name: string, Bio: string, Birth: string): void {
    this.dialog.open(MovieDirectorInfoComponent, {
      width: '600px',
      data: {
        Name: Name,
        Bio: Bio,
        Birth: Birth
      }
    });
  }

  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(MovieGenreInfoComponent, {
      width: '600px',
      data: {
        Name: Name,
        Description: Description
      }
    });
  }

  openDescriptionDialog(Description: string): void {
    this.dialog.open(MovieDescriptionInfoComponent, {
      width: '600px',
      data: {
        Description: Description
      }
    });
  }
}
