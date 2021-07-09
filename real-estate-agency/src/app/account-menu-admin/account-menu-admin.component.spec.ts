import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMenuAdminComponent } from './account-menu-admin.component';

describe('AccountMenuAdminComponent', () => {
  let component: AccountMenuAdminComponent;
  let fixture: ComponentFixture<AccountMenuAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountMenuAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMenuAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
