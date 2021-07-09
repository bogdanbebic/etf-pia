import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstatesPromotedComponent } from './real-estates-promoted.component';

describe('RealEstatesPromotedComponent', () => {
  let component: RealEstatesPromotedComponent;
  let fixture: ComponentFixture<RealEstatesPromotedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstatesPromotedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstatesPromotedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
