import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstatesUnapprovedComponent } from './real-estates-unapproved.component';

describe('RealEstatesUnapprovedComponent', () => {
  let component: RealEstatesUnapprovedComponent;
  let fixture: ComponentFixture<RealEstatesUnapprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstatesUnapprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstatesUnapprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
