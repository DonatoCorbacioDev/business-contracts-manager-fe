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
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { ManagersComponent } from './components/managers/managers.component';
import { ContractManagersService } from './services/contract-managers/contract-managers.service';
import { FinancialValuesComponent } from './components/financial-values/financial-values.component';
import { FinancialTypesComponent } from './components/financial-types/financial-types.component';
import { AreaComponent } from './components/area/area.component';
import { ContractManagersComponent } from './components/contract-managers/contract-managers.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContractsComponent,
    ManagersComponent,
    ContractManagersComponent,
    AreaComponent,
    FinancialTypesComponent,
    FinancialValuesComponent
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
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(withFetch()) 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
