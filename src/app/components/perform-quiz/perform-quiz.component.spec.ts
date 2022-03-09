import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformQuizComponent } from './perform-quiz.component';

describe('PerformQuizComponent', () => {
  let component: PerformQuizComponent;
  let fixture: ComponentFixture<PerformQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
