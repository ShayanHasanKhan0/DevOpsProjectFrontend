import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatstabComponent } from './statstab.component';

describe('StatstabComponent', () => {
  let component: StatstabComponent;
  let fixture: ComponentFixture<StatstabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatstabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatstabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
