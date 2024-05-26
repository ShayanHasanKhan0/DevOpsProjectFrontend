import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewstatstabComponent } from './viewstatstab.component';

describe('ViewstatstabComponent', () => {
  let component: ViewstatstabComponent;
  let fixture: ComponentFixture<ViewstatstabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewstatstabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewstatstabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
