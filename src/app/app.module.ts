import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MovieDirectorInfoComponent } from './movie-director-info/movie-director-info.component';
import { MovieGenreInfoComponent } from './movie-genre-info/movie-genre-info.component';
import { MovieDescriptionInfoComponent } from './movie-description-info/movie-description-info.component';
import { AppHeaderComponent } from './app-header/app-header.component';

const appRoutes: Routes = [
    { path: 'welcome', component: WelcomePageComponent },
    { path: 'movies', component: MovieCardComponent },
    { path: 'profile', component: UserProfileComponent},
    { path: '**', redirectTo: 'welcome'}
];

@NgModule({
    declarations: [
        AppComponent,
        UserRegistrationFormComponent,
        UserLoginFormComponent,
        MovieCardComponent,
        WelcomePageComponent,
        UserProfileComponent,
        MovieDirectorInfoComponent,
        MovieGenreInfoComponent,
        MovieDescriptionInfoComponent,
        AppHeaderComponent
    ],
    imports: [
        AppRoutingModule,
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatToolbarModule
    ],
    providers: [
        provideAnimations(),
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }