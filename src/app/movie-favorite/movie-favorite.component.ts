// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input, Inject } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-favorite',
  templateUrl: './movie-favorite.component.html',
  styleUrls: ['./movie-favorite.component.scss'],
})
export class MovieFavoriteComponent {
  /**
   * Creates an instance of the MovieFavoriteComponent.
   * @param fetchApiData - Service to interact with the API
   * @param dialogRef - ...
   * @param dialog - ...
   * @param snackBar - Service to show notifications to the user
   * @param router - ...
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    },
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<MovieFavoriteComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
