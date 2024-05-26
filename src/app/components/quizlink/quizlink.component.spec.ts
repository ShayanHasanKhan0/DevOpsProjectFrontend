import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizlinkComponent } from './quizlink.component';

describe('QuizlinkComponent', () => {
  let component: QuizlinkComponent;
  let fixture: ComponentFixture<QuizlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizlinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
