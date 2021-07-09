import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMenuUserComponent } from './account-menu-user.component';

describe('AccountMenuUserComponent', () => {
  let component: AccountMenuUserComponent;
  let fixture: ComponentFixture<AccountMenuUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountMenuUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMenuUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
