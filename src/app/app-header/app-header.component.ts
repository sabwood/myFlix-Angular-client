import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {

  ngOnInIt(): void {}

  constructor(private router: Router) {}

  navigateToMovies(): void {
    this.router.navigate(['/movies']);
  }

  navigateToWelcome(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  isOnProfileRoute(): boolean {
    return this.router.url === '/profile';
  }

  isOnMoviesRoute(): boolean {
    return this.router.url === '/movies';
  }
}
