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
  // username: any = JSON.parse(this.user).Username;
  // email: any = JSON.parse(this.user).Email;
  // birthday: any = JSON.parse(this.user).Birthday;
  // password: any = JSON.parse(this.user).Password;
  username: any = JSON.parse(this.user).Username;
  email: any;
  birthday: any;
  password: any;

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    // @Inject(MAT_DIALOG_DATA)
    // public data: {},
    public fetchApiData: UserRegistrationService,
    // public dialogRef: MatDialogRef<UserProfileComponent>,
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
              console.log('it hit');
              return true;
            }
          }
          return false;
        });
        console.log(this.favoriteMovies);
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
    console.log('hit 1');
    this.fetchApiData.getGenre(genre).subscribe((resp: any) => {
      console.log('hit 2');
      this.dialog.open(MovieGenreComponent, {
        width: '280px',
        data: resp,
      });
    });
  }

  getDirector(director: string): void {
    console.log('hit 1');
    this.fetchApiData.getDirector(director).subscribe((resp: any) => {
      console.log('hit 2');
      this.dialog.open(MovieDirectorComponent, {
        width: '280px',
        data: resp,
      });
    });
  }

  getSypnosis(title: string): void {
    console.log('hit 1');
    this.fetchApiData.getSingleMovie(title).subscribe((resp: any) => {
      console.log('hit 2');
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
        console.log('removed movie');
        this.getMovies();
        this.router.navigate(['profile']);
      });
  }
}
