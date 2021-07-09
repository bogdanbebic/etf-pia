import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstatesMyListComponent } from './real-estates-my-list.component';

describe('RealEstatesMyListComponent', () => {
  let component: RealEstatesMyListComponent;
  let fixture: ComponentFixture<RealEstatesMyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstatesMyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstatesMyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
