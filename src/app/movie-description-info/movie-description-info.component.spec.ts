import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDescriptionInfoComponent } from './movie-description-info.component';

describe('MovieDescriptionInfoComponent', () => {
  let component: MovieDescriptionInfoComponent;
  let fixture: ComponentFixture<MovieDescriptionInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieDescriptionInfoComponent]
    });
    fixture = TestBed.createComponent(MovieDescriptionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
