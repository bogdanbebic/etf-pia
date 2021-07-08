import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateCardComponent } from './real-estate-card.component';

describe('RealEstateCardComponent', () => {
  let component: RealEstateCardComponent;
  let fixture: ComponentFixture<RealEstateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstateCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
