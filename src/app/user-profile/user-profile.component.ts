import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router
  ) { }

  ngOnInit(): void {
    
  }

  getUser(): void {
    this.fetchApiData.getUser(this.userData).subscribe((resp: any) => {
      this.userData = {
        ...resp,
        id: resp._id,
        Username: this.userData.Username,
        Password: this.userData.Password,
        Email: this.userData.Email,
        Birthday: this.userData.Birthday,
        token: this.userData.token
      };
      localStorage.setItem("user", JSON.stringify(this.userData));
    });
  }

  editUser(): void {
    this.fetchApiData.editUser(this.userData.Username, this.userData).subscribe((resp: any) => {
      this.userData = {
        ...resp,
        id: resp._id,
        Username: this.userData.Username,
        Password: this.userData.Password,
        Email: this.userData.Email,
        Birthday: this.userData.Birthday,
        token: this.userData.token
      };
      localStorage.setItem("user", JSON.stringify(this.userData))
    });
  }

  getUserFavoriteMovies(): void {
    this.fetchApiData.getUserFavoriteMovies(this.userData.FavoriteMovies).subscribe((resp: any) => {
      this.userData.FavoriteMovies = resp;
      console.log(this.userData.FavoriteMovies);
      return this.userData.FavoriteMovies;
    })
  }
}
