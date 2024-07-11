import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ManagersComponent } from './components/managers/managers.component';
import { ContractsSelectViewComponent } from './components/contracts-select-view/contracts-select-view.component';
import { AreaComponent } from './components/area/area.component';
import { FinancialValuesComponent } from './components/financial-values/financial-values.component';
import { FinancialTypesComponent } from './components/financial-types/financial-types.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contracts-select-view', component: ContractsSelectViewComponent },
  { path: 'managers', component: ManagersComponent },
  { path: 'area', component: AreaComponent },
  { path: 'financial-types', component: FinancialTypesComponent },
  { path: 'financial-values', component: FinancialValuesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
