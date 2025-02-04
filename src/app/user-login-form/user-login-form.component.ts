import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * @summary User login form component that provides a form to input user details.
 * @class UserLoginFormComponent
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
    
  }

  /**
   * @summary Function to login user using UserRegistrationService.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      this.dialogRef.close();
      this.snackBar.open('user logged in successfully!', 'OK', {
        duration: 2000
      });
      let user = {
        ...response.user,
        id: response.user._id,
        Username: this.userData.Username,
        Password: this.userData.Password,
        token: response.token
      }
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);
      this.router.navigate(['movies']);
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
