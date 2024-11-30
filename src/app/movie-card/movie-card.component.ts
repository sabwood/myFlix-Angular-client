import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MovieDirectorInfoComponent } from '../movie-director-info/movie-director-info.component';
import { MovieGenreInfoComponent } from '../movie-genre-info/movie-genre-info.component';
import { MovieDescriptionInfoComponent } from '../movie-description-info/movie-description-info.component';

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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  modifyFavoriteMovies(movie: any): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const Username = user.Username;

    if (!user.FavoriteMovies) {
      user.FavoriteMovies = [];
    }

    if (this.isFavorite(movie)) {
      this.fetchApiData.deleteFavoriteMovie(Username, movie._id).subscribe(() => {
        user.FavoriteMovies = user.FavoriteMovies.filter(
          (id: string) => id !== movie._id
        );
        localStorage.setItem('user', JSON.stringify(user));
        this.getMovies();
      });
    } else {
      this.fetchApiData.addFavoriteMovie(Username, movie._id).subscribe(() => {
        user.FavoriteMovies.push(movie._id);
        localStorage.setItem('user', JSON.stringify(user));
        this.getMovies();
      });
    }
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
