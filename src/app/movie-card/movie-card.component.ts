import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MovieDirectorInfoComponent } from '../movie-director-info/movie-director-info.component';
import { MovieGenreInfoComponent } from '../movie-genre-info/movie-genre-info.component';
import { MovieDescriptionInfoComponent } from '../movie-description-info/movie-description-info.component';

/**
 * @summary Movie card component to display a list of movies.
 * @class MovieCardComponent
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  movie: any = {};
  FavoriteMovies: any[] = [];
  userData: any = {};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.movie._id = document.getElementById(`${this.movie._id}`),
    this.userData = JSON.parse(localStorage.getItem("user") || "")
  }
  
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * @summary Function to get list of all movies.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * @summary Function to add a movie to current users favorite movies list.
   * @param movie 
   */
  addFavoriteMovie(movie: any): void {
    const Username = this.userData.Username;
    this.fetchApiData.addFavoriteMovie(Username, movie._id).subscribe((resp: any) => {
      this.userData.FavoriteMovies = this.userData.FavoriteMovies.filter(
        (id: string) =>  id !== movie._id
      );
      localStorage.setItem('user', JSON.stringify(resp));
      this.getMovies();
    }, (err: any) => {
      console.error(err);
    });
  }

  /**
   * @summary Function to remove a movie from current users favorite movies list.
   * @param movie 
   */
  removeFavoriteMovie(movie: any): void {
    const Username = this.userData.Username;
    this.fetchApiData.deleteFavoriteMovie(Username, movie._id).subscribe((resp: any) => {
      this.userData.FavoriteMovies = this.userData.FavoriteMovies.filter(
        (id: string) => id !== movie._id
      );
      localStorage.setItem('user', JSON.stringify(resp));
      this.getMovies();
    }, (err: any) => {
      console.error(err);
    });
  }

  /**
   * @summary Function to check if a movie is in the current users favorite movies list.
   * @param movie 
   * @returns true if a movie on the current users favorite movies list, otherwise false.
   */
  isFavorite(movie: any): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (
      Array.isArray(user.FavoriteMovies) &&
      user.FavoriteMovies.includes(movie._id)
    );
  }

  /**
   * @summary Opens director dialog when the director button is clicked.
   * @param Name 
   * @param Bio 
   * @param Birth 
   */
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

  /**
   * @summary Opens genre dialog when the genre button is clicked.
   * @param Name 
   * @param Description 
   */
  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(MovieGenreInfoComponent, {
      width: '600px',
      data: {
        Name: Name,
        Description: Description
      }
    });
  }

  /**
   * @summary Opens description when the description button is clicked.
   * @param Description 
   */
  openDescriptionDialog(Description: string): void {
    this.dialog.open(MovieDescriptionInfoComponent, {
      width: '600px',
      data: {
        Description: Description
      }
    });
  }
}
