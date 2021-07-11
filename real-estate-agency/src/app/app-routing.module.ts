import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthGuard } from './auth.guard';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RealEstateDetailComponent } from './real-estate-detail/real-estate-detail.component';
import { RealEstatesListComponent } from './real-estates-list/real-estates-list.component';
import { RealEstatesMyListComponent } from './real-estates-my-list/real-estates-my-list.component';
import { RealEstatesNewComponent } from './real-estates-new/real-estates-new.component';
import { RealEstatesPromotedComponent } from './real-estates-promoted/real-estates-promoted.component';
import { RealEstatesUnapprovedComponent } from './real-estates-unapproved/real-estates-unapproved.component';
import { RegisterComponent } from './register/register.component';
import { UserRoles } from './user-roles.enum';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRoles.Unregistered] }
  },
  {
    path: 'register', component: RegisterComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRoles.Unregistered] }
  },
  {
    path: 'profile', component: AccountSettingsComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRoles.Registered, UserRoles.Agent, UserRoles.Admin] }
  },
  {
    path: 'new-real-estate', component: RealEstatesNewComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRoles.Registered, UserRoles.Agent, UserRoles.Admin] }
  },
  {
    path: 'my-real-estates', component: RealEstatesMyListComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRoles.Registered] }
  },
  {
    path: 'unapproved-real-estates', component: RealEstatesUnapprovedComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRoles.Agent, UserRoles.Admin] }
  },
  {
    path: 'promoted-real-estates', component: RealEstatesPromotedComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRoles.Agent] }
  },
  {
    path: 'all-real-estates', component: RealEstatesListComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRoles.Agent] }
  },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRoles.Agent, UserRoles.Admin] }
  },
  {
    path: 'admin-dashboard', component: DashboardAdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRoles.Admin] }
  },
  {
    path: 'user-list', component: UsersListComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRoles.Admin] }
  },
  {
    path: 'real-estate/:id', component: RealEstateDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRoles.Registered] }
  },
  {
    path: '', component: HomepageComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRoles.Unregistered, UserRoles.Registered, UserRoles.Agent, UserRoles.Admin] }
  },
  {
    path: '**', redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
