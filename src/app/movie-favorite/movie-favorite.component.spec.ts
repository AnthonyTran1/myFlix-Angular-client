import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFavoriteComponent } from './movie-favorite.component';

describe('MovieFavoriteComponent', () => {
  let component: MovieFavoriteComponent;
  let fixture: ComponentFixture<MovieFavoriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieFavoriteComponent]
    });
    fixture = TestBed.createComponent(MovieFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
