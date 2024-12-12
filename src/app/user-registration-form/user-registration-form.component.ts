import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @summary User registration form component that provides a form to input new user details.
 * @class UserRegistrationComponent
 */
@Component({
    selector: 'app-user-registration-form',
    templateUrl: './user-registration-form.component.html',
    styleUrls: ['./user-registration-form.component.scss'],
    standalone: false
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
  }

  /**
   * @summary Function to register new user using UserRegistrationService.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      this.dialogRef.close();
      this.snackBar.open('user registered successfully!', 'OK', {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
