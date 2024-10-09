import { Injectable } from '@angular/core';

import { catchError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movies-flix-aada9cec6615.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
  // User Login Endpoint
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Get ALL movies Endpoint
  // needs token
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // Get SINGLE movie by title Endpoint
  // needs token
  public getSingleMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + title)
      .pipe(catchError(this.handleError));
  }

  // Get Director information by name Endpoint
  // needs token
  public getDirector(director: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/directors/' + director)
      .pipe(catchError(this.handleError));
  }

  // Get list of movies by genre Endpoint
  // needs token
  public getGenre(genre: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/genres/' + genre)
      .pipe(catchError(this.handleError));
  }

  // Get User by username Endpoint
  // needs token
  public getUser(username: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + username)
      .pipe(catchError(this.handleError));
  }

  // Get user's list of favorite movies Endpoint
  // did not originally have an endpoint for this
  // needs token
  public getFavoriteMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'users/favorites/')
      .pipe(catchError(this.handleError));
  }

  // Add movie to User's favorite movie list Endpoint
  // check api parameters to make sure to match spelling and capitalization
  // needs token
  public addFavoriteMovie(username: string, movie: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users/' + username + '/movies/' + movie.ID, movie)
      .pipe(catchError(this.handleError));
  }

  // Update/edit user information Endpoint
  // needs token
  // check api parameters to make sure to match spelling and capitalization
  public editUser(userDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + userDetails.username, userDetails)
      .pipe(catchError(this.handleError));
  }

  // DELETE User Endpoint
  // needs token
  public deleteUser(username: string): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + username)
      .pipe(catchError(this.handleError));
  }

  // Remove movie from User's favorite movie list Endpoint
  // check api parameters to make sure to match spelling and capitalization
  // needs token
  public deleteFavoriteMovie(username: string, movie: any): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + username + '/movies/' + movie.ID)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later!!!');
  }
}
