import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieUnfavoriteComponent } from './movie-unfavorite.component';

describe('MovieUnfavoriteComponent', () => {
  let component: MovieUnfavoriteComponent;
  let fixture: ComponentFixture<MovieUnfavoriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieUnfavoriteComponent]
    });
    fixture = TestBed.createComponent(MovieUnfavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
