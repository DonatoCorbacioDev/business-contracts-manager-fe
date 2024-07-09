import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { ManagersComponent } from './components/managers/managers.component';
import { FinancialValuesComponent } from './components/financial-values/financial-values.component';
import { FinancialTypesComponent } from './components/financial-types/financial-types.component';
import { AreaComponent } from './components/area/area.component';
import { AddEditContractDialogComponent } from './components/contracts/add-edit-contract-dialog/add-edit-contract-dialog.component';
import { AddEditManagerDialogComponent } from './components/managers/add-edit-manager-dialog/add-edit-manager-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContractsComponent,
    ManagersComponent,
    AreaComponent,
    FinancialTypesComponent,
    FinancialValuesComponent,
    AddEditContractDialogComponent,
    AddEditManagerDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule, 
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(withFetch()) 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
