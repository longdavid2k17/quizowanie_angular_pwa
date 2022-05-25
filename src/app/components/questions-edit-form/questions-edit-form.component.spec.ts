import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsEditFormComponent } from './questions-edit-form.component';

describe('QuestionsEditFormComponent', () => {
  let component: QuestionsEditFormComponent;
  let fixture: ComponentFixture<QuestionsEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
