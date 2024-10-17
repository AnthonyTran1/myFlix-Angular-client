// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input, Inject } from '@angular/core';

import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

// You'll use this import to close the dialog on success
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { MovieUnfavoriteComponent } from '../movie-unfavorite/movie-unfavorite.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  movies: any[] = [];
  userFav: any = [];
  favoriteMovies: any = [];
  user: any = localStorage.getItem('user');
  username: any = localStorage.getItem('username');
  email: any;
  birthday: any;
  password: any;

  localstorageUser: any = localStorage.getItem('username');

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Creates an instance of the UserProfileComponent.
   * @param fetchApiData - Service to interact with the API
   * @param dialog - ...
   * @param snackBar - Service to show notifications to the user
   * @param router - ...
   */

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getUser(this.username).subscribe((resp: any) => {
      this.username = resp.Username;
      this.password = resp.Password;
      this.birthday = resp.Birthday;
      this.email = resp.Email;
      this.userFav = resp.FavoriteMovies;
      this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.favoriteMovies = resp.filter((m: any) => {
          for (let favM of this.userFav) {
            if (favM === m._id) {
              return true;
            }
          }
          return false;
        });
        return this.favoriteMovies;
      });
    });
  }

  goToMainMenu(): void {
    this.router.navigate(['movies']);
  }

  updateInformation(): void {
    this.fetchApiData
      .editUser(this.username, this.userData)
      .subscribe((response) => {
        console.log('Update Complete');
        localStorage.setItem('username', this.userData.Username);

        this.username = this.userData.Username;
        this.password = this.userData.Password;
        this.birthday = this.userData.Birthday;
        this.email = this.userData.Email;
        this.getUserInfo();
      });
  }

  getUserInfo(): void {
    this.fetchApiData.getUser(this.username).subscribe((resp: any) => {
      this.username = resp.Username;
      this.password = resp.Password;
      this.birthday = resp.Birthday;
      this.email = resp.Email;
      this.userFav = resp.FavoriteMovies;
    });
  }

  getGenre(genre: string): void {
    this.fetchApiData.getGenre(genre).subscribe((resp: any) => {
      this.dialog.open(MovieGenreComponent, {
        width: '280px',
        data: resp,
      });
    });
  }

  getDirector(director: string): void {
    this.fetchApiData.getDirector(director).subscribe((resp: any) => {
      this.dialog.open(MovieDirectorComponent, {
        width: '280px',
        data: resp,
      });
    });
  }

  getSypnosis(title: string): void {
    this.fetchApiData.getSingleMovie(title).subscribe((resp: any) => {
      this.dialog.open(MovieSynopsisComponent, {
        width: '280px',
        data: resp.Description,
      });
    });
  }

  removeFavoriteMovie(movie: any): void {
    this.fetchApiData
      .removeFavoriteMovie(this.username, movie)
      .subscribe((resp: any) => {
        this.dialog.open(MovieUnfavoriteComponent, {
          width: '280px',
          data: resp.Description,
        });
        this.getMovies();
        this.router.navigate(['profile']);
      });
  }
}
