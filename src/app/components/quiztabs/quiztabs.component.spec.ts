import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiztabsComponent } from './quiztabs.component';

describe('QuiztabsComponent', () => {
  let component: QuiztabsComponent;
  let fixture: ComponentFixture<QuiztabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuiztabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiztabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
