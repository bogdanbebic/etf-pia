import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotedComponent } from './promoted.component';

describe('PromotedComponent', () => {
  let component: PromotedComponent;
  let fixture: ComponentFixture<PromotedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
