import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from './material/material.module';
import { SearchComponent } from './search/search.component';
import { PromotedComponent } from './promoted/promoted.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { RealEstateCardComponent } from './real-estate-card/real-estate-card.component';
import { AccountMenuUserComponent } from './account-menu-user/account-menu-user.component';
import { AccountMenuAgentComponent } from './account-menu-agent/account-menu-agent.component';
import { AccountMenuAdminComponent } from './account-menu-admin/account-menu-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { RealEstatesListComponent } from './real-estates-list/real-estates-list.component';
import { RealEstatesPromotedComponent } from './real-estates-promoted/real-estates-promoted.component';
import { RealEstatesUnapprovedComponent } from './real-estates-unapproved/real-estates-unapproved.component';
import { RealEstatesNewComponent } from './real-estates-new/real-estates-new.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RealEstatesMyListComponent } from './real-estates-my-list/real-estates-my-list.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    PromotedComponent,
    HomepageComponent,
    AccountMenuComponent,
    RealEstateCardComponent,
    AccountMenuUserComponent,
    AccountMenuAgentComponent,
    AccountMenuAdminComponent,
    DashboardComponent,
    DashboardAdminComponent,
    RealEstatesListComponent,
    RealEstatesPromotedComponent,
    RealEstatesUnapprovedComponent,
    RealEstatesNewComponent,
    UsersListComponent,
    RealEstatesMyListComponent,
    AccountSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
