import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieGenreInfoComponent } from './movie-genre-info.component';

describe('MovieGenreInfoComponent', () => {
  let component: MovieGenreInfoComponent;
  let fixture: ComponentFixture<MovieGenreInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieGenreInfoComponent]
    });
    fixture = TestBed.createComponent(MovieGenreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
