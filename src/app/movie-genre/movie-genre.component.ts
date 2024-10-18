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
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.scss'],
})
export class MovieGenreComponent {
  /**
   * Creates an instance of the MovieGenreComponent.
   * @param fetchApiData - Service to interact with the API
   * @param dialogRef - Importing the dialogRef to display a modal
   * @param dialog - Importing the MatDialog to display a modal
   * @param snackBar - Service to show notifications to the user
   * @param router - Importing list of navigiational paths within the app
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    },
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<MovieGenreComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
