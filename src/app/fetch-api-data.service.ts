import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://wood-movies-flix-0f8372d87a02.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

/**
 * @summary Service responsible for interacting with the backend API.
 * @class UserRegistrationService
 */
export class UserRegistrationService {
  constructor(private http: HttpClient) {
  }

  /**
   * @summary Function to register new users.
   * @param userDetails 
   * @returns new user signed up
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * @summary Function to log users in.
   * @param userDetails 
   * @returns current user logged in
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * @summary Function to get all movies.
   * @returns list of all movies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @summary Function to get a movie by movie title.
   * @param Title 
   * @returns movie by title
   */
  getMovie(Title: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + Title, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @summary Function to get director by name.
   * @param directorName 
   * @returns director by name
   */
  getMovieDirector(directorName: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @summary Function to get genre by name.
   * @param genreName 
   * @returns genre by name
   */
  getMovieGenre(genreName: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @summary Function to get user.
   * @param Username 
   * @returns current user
   */
  getUser(Username: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + Username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @summary Function to add a movie to current users favorite movies.
   * @param Username 
   * @param MovieID 
   * @returns movie added to current users favorite movies list
   */
  addFavoriteMovie(Username: String, MovieID: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + Username + '/movies/' + MovieID, null, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @summary Function to edit current user.
   * @param Username 
   * @param userDetails 
   * @returns updated user information
   */
  editUser(Username: String, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + Username, userDetails, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @summary Function to delete current user.
   * @param Username 
   * @returns current user deleted
   */
  deleteUser(Username: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + Username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @summary Function to remove a movie to current users favorite movies.
   * @param Username 
   * @param MovieID 
   * @returns movie removed to current users favorite movies list
   */
  deleteFavoriteMovie(Username: String, MovieID: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + Username + '/movies/' + MovieID, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @summary Function to handle errors.
   * @param error 
   * @returns error in console if error is present
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }
}

