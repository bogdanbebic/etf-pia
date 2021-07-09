import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstatesNewComponent } from './real-estates-new.component';

describe('RealEstatesNewComponent', () => {
  let component: RealEstatesNewComponent;
  let fixture: ComponentFixture<RealEstatesNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstatesNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstatesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
