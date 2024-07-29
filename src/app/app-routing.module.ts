import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ManagersComponent } from './components/managers/managers.component';
import { ContractsSelectViewComponent } from './components/contracts-select-view/contracts-select-view.component';
import { AreaComponent } from './components/area/area.component';
import { FinancialValuesComponent } from './components/financial-values/financial-values.component';
import { FinancialTypesComponent } from './components/financial-types/financial-types.component';
import { RolesComponent } from './components/roles/roles.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'contracts-select-view', component: ContractsSelectViewComponent, canActivate: [AuthGuard] },
  { path: 'managers', component: ManagersComponent, canActivate: [AuthGuard] },
  { path: 'area', component: AreaComponent, canActivate: [AuthGuard] },
  { path: 'financial-types', component: FinancialTypesComponent, canActivate: [AuthGuard] },
  { path: 'financial-values', component: FinancialValuesComponent, canActivate: [AuthGuard] },
  { path: 'roles', component: RolesComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
