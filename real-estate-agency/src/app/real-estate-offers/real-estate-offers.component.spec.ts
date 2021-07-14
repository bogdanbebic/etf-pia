import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateOffersComponent } from './real-estate-offers.component';

describe('RealEstateOffersComponent', () => {
  let component: RealEstateOffersComponent;
  let fixture: ComponentFixture<RealEstateOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstateOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
