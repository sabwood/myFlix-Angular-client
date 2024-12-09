import { Component, Input, OnInit } from '@angular/core';
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

  @Input() userFormValues = { Username: "", Password: "", Email: "", Birthday: "", FavoriteMovies: [] };
  userData: any = {};
  FavoriteMovies: any[] = [];
  movies: any[] = [];
  movie: any = {};

  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router,
    public dialog: MatDialog
  ) {
    this.movie._id = document.getElementById(`${this.movie._id}`),
    this.userData = JSON.parse(localStorage.getItem("user") || "")
  }

  ngOnInit(): void {
    this.getUser();
    this.getFavoriteMovies();
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
        FavoriteMovies: this.userData.FavoriteMovies,
        token: this.userData.token
      };
      this.userFormValues.Password = this.userData.Password;

      localStorage.setItem("user", JSON.stringify(this.userData));
    });
  }

  editUser(): void {
    this.fetchApiData.editUser(this.userData.Username, this.userFormValues).subscribe((resp: any) => {
      this.userFormValues.Username = this.userFormValues.Username;
      this.userFormValues.Password = this.userData.Password;
      this.userFormValues.Email = this.userFormValues.Email;
      this.userFormValues.Birthday = this.userFormValues.Birthday;
      this.userFormValues.FavoriteMovies = this.userData.FavoriteMovies;

      localStorage.setItem("user", JSON.stringify(this.userFormValues));
      console.log(this.userFormValues);
      console.log(resp);
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.FavoriteMovies = resp.filter((movie: any) => {
        return this.userData.FavoriteMovies.includes(movie._id);
      });
    }, (err: any) => {
      console.error(err);
      return this.FavoriteMovies;
    });
  }

  addFavoriteMovie(movie: any): void {
    const Username = this.userData.Username;
    this.fetchApiData.addFavoriteMovie(Username, movie._id).subscribe((resp: any) => {
      this.userData.FavoriteMovies = this.userData.FavoriteMovies.filter(
        (id: string) =>  id !== movie._id
      );
      localStorage.setItem('user', JSON.stringify(resp));
      this.getFavoriteMovies();
    }, (err: any) => {
      console.error(err);
    });
  }

  removeFavoriteMovie(movie: any): void {
    const Username = this.userData.Username;
    this.fetchApiData.deleteFavoriteMovie(Username, movie._id).subscribe((resp: any) => {
      this.userData.FavoriteMovies = this.userData.FavoriteMovies.filter(
        (id: string) => id !== movie._id
      );
      localStorage.setItem('user', JSON.stringify(resp));
      this.getFavoriteMovies();
    }, (err: any) => {
      console.error(err);
    });
  }

  isFavorite(movie: any): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (
      Array.isArray(user.FavoriteMovies) &&
      user.FavoriteMovies.includes(movie._id)
    );
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
