import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FinancialValuesService } from '../../services/financial-values/financial-values.service';
import { ContractsService } from '../../services/contracts/contracts.service';
import { FinancialTypesService } from '../../services/financial-types/financial-types.service';
import { AreaService } from '../../services/area/area.service';
import { AuthService } from '../../services/auth/auth.service';
import { Contract } from '../../models/contract.model';
import { FinancialValue } from '../../models/financial-value.model';
import { FinancialType } from '../../models/financial-type.model';
import { Area } from '../../models/area.model';
import { AddEditFinancialValueDialogComponent } from './add-edit-financial-value-dialog/add-edit-financial-value-dialog.component';

@Component({
  selector: 'app-financial-values',
  templateUrl: './financial-values.component.html',
  styleUrls: ['./financial-values.component.css']
})
export class FinancialValuesComponent implements OnInit {
  contracts: Contract[] = [];
  selectedContract: Contract | null = null;
  financialValues: FinancialValue[] = [];
  dataSourceContracts: MatTableDataSource<Contract> = new MatTableDataSource<Contract>();
  dataSourceFinancialValues: MatTableDataSource<FinancialValue> = new MatTableDataSource<FinancialValue>();
  displayedColumnsContracts: string[] = ['contract', 'actions'];
  displayedColumnsFinancialValues: string[] = ['id', 'month', 'year', 'value', 'financialType', 'area', 'actions'];
  financialTypes: FinancialType[] = [];
  areas: Area[] = [];
  isAdmin: boolean = false;

  constructor(private contractsService: ContractsService,
              private financialValuesService: FinancialValuesService,
              private financialTypesService: FinancialTypesService,
              private areaService: AreaService,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.getRoleString() === 'Amministratore';
    this.loadContracts();
    this.loadFinancialTypes();
    this.loadAreas();
  }

  loadContracts(): void {
    this.contractsService.getContracts().subscribe((data: Contract[]) => {
      this.contracts = data;
      this.dataSourceContracts.data = this.contracts;
    });
  }

  loadFinancialValues(contractId: number): void {
    this.financialValuesService.getByContractId(contractId).subscribe((data: FinancialValue[]) => {
      this.financialValues = data.map(fv => ({
        ...fv,
        financialType: this.getFinancialType(fv.financialTypeId),
        area: this.getArea(fv.areaId)
      }));
      this.dataSourceFinancialValues.data = this.financialValues;
    });
  }

  loadFinancialTypes(): void {
    this.financialTypesService.getAll().subscribe(data => {
      this.financialTypes = data;
    });
  }

  loadAreas(): void {
    this.areaService.getAll().subscribe(data => {
      this.areas = data;
    });
  }

  getFinancialType(id: number): string {
    const type = this.financialTypes.find(ft => ft.id === id);
    return type ? type.value : 'N/A';
  }

  getArea(id: number): string {
    const area = this.areas.find(a => a.id === id);
    return area ? area.value : 'N/A';
  }

  selectContract(contract: Contract): void {
    this.selectedContract = contract;
    this.loadFinancialValues(contract.id);
  }

  addFinancialValue(): void {
    if (!this.selectedContract) {
      return;
    }
    const dialogRef = this.dialog.open(AddEditFinancialValueDialogComponent, {
      width: '400px',
      data: {
        financialTypes: this.financialTypes,
        areas: this.areas,
        contractId: this.selectedContract.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFinancialValues(this.selectedContract!.id);
      }
    });
  }

  editFinancialValue(financialValue: FinancialValue): void {
    const dialogRef = this.dialog.open(AddEditFinancialValueDialogComponent, {
      width: '400px',
      data: {
        financialValue,
        financialTypes: this.financialTypes,
        areas: this.areas,
        contractId: this.selectedContract!.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFinancialValues(this.selectedContract!.id);
      }
    });
  }

  deleteFinancialValue(id: number): void {
    this.financialValuesService.deleteFinancialValue(id).subscribe(
      () => {
        this.loadFinancialValues(this.selectedContract!.id);
        this.snackBar.open('Financial value successfully deleted', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        this.snackBar.open(error, 'Close', {
          duration: 5000,
        });
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSourceContracts.filter = filterValue;
  }
}
