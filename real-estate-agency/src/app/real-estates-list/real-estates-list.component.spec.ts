import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstatesListComponent } from './real-estates-list.component';

describe('RealEstatesListComponent', () => {
  let component: RealEstatesListComponent;
  let fixture: ComponentFixture<RealEstatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstatesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
