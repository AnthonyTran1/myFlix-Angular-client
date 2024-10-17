// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MovieFavoriteComponent } from '../movie-favorite/movie-favorite.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];

  /**
   * Creates an instance of the UserRegistrationComponent.
   * @param fetchApiData - Service to interact with the API
   * @param dialog - ...
   * @param router - ...
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    private router: Router
  ) {}

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

  addFavoriteMovie(movie: any): void {
    let user: any = localStorage.getItem('user');
    let username: any = JSON.parse(user).Username;
    this.fetchApiData
      .addFavoriteMovie(username, movie)
      .subscribe((resp: any) => {
        console.log('added movie');
        this.dialog.open(MovieFavoriteComponent, {
          width: '280px',
          data: resp.Description,
        });
      });
  }

  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  goToWelcome(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
