import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMenuAgentComponent } from './account-menu-agent.component';

describe('AccountMenuAgentComponent', () => {
  let component: AccountMenuAgentComponent;
  let fixture: ComponentFixture<AccountMenuAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountMenuAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMenuAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
