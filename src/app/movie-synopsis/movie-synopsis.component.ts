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
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrls: ['./movie-synopsis.component.scss'],
})
export class MovieSynopsisComponent {
  /**
   * Creates an instance of the MovieSynopsisComponent.
   * @param fetchApiData - Service to interact with the API
   * @param dialogRef - Importing the dialogRef to display a modal
   * @param dialog - Importing the MatDialog to display a modal
   * @param snackBar - Service to show notifications to the user
   * @param router - Importing list of navigiational paths within the app
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {},
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<MovieSynopsisComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
