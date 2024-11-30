import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDirectorInfoComponent } from './movie-director-info.component';

describe('MovieDirectorInfoComponent', () => {
  let component: MovieDirectorInfoComponent;
  let fixture: ComponentFixture<MovieDirectorInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieDirectorInfoComponent]
    });
    fixture = TestBed.createComponent(MovieDirectorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
