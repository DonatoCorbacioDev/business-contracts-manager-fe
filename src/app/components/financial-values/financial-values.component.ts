import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FinancialValuesService } from '../../services/financial-values/financial-values.service';
import { FinancialTypesService } from '../../services/financial-types/financial-types.service';
import { AreaService } from '../../services/area/area.service';
import { ContractsService } from '../../services/contracts/contracts.service';
import { FinancialType } from '../../models/financial-type.model';
import { Area } from '../../models/area.model';
import { Contract } from '../../models/contract.model';
import { FinancialValue } from '../../models/financial-value.model';
import { AddEditFinancialValueDialogComponent } from './add-edit-financial-value-dialog/add-edit-financial-value-dialog.component';

@Component({
  selector: 'app-financial-values',
  templateUrl: './financial-values.component.html',
  styleUrls: ['./financial-values.component.css']
})
export class FinancialValuesComponent implements OnInit {
  financialValues: FinancialValue[] = [];
  dataSource: MatTableDataSource<FinancialValue> = new MatTableDataSource<FinancialValue>();
  financialTypes: FinancialType[] = [];
  areas: Area[] = [];
  contracts: Contract[] = [];
  displayedColumns: string[] = ['id', 'month', 'year', 'value', 'financialType', 'area', 'contract', 'actions'];

  constructor(private financialValuesService: FinancialValuesService,
              private financialTypesService: FinancialTypesService,
              private areaService: AreaService,
              private contractsService: ContractsService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadFinancialValues();
    this.loadFinancialTypes();
    this.loadAreas();
    this.loadContracts();
    this.dataSource.filterPredicate = (data: FinancialValue, filter: string): boolean => {
      return data.contract ? data.contract.toLowerCase().includes(filter) : false;
    };
  }

  loadFinancialValues(): void {
    forkJoin({
      financialValues: this.financialValuesService.getAll(),
      financialTypes: this.financialTypesService.getAll(),
      areas: this.areaService.getAll(),
      contracts: this.contractsService.getAll()
    }).subscribe(({ financialValues, financialTypes, areas, contracts }) => {
      this.financialTypes = financialTypes;
      this.areas = areas;
      this.contracts = contracts;

      this.financialValues = financialValues.map(fv => ({
        ...fv,
        financialType: this.getFinancialType(fv.financialTypeId),
        area: this.getArea(fv.areaId),
        contract: this.getContract(fv.contractId)
      }));
      this.dataSource.data = this.financialValues;
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

  loadContracts(): void {
    this.contractsService.getAll().subscribe(data => {
      this.contracts = data;
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

  getContract(id: number): string {
    const contract = this.contracts.find(c => c.id === id);
    return contract ? contract.contract : 'N/A';
  }

  addFinancialValue(): void {
    const dialogRef = this.dialog.open(AddEditFinancialValueDialogComponent, {
      width: '400px',
      data: {
        financialTypes: this.financialTypes,
        areas: this.areas,
        contracts: this.contracts
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFinancialValues();
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
        contracts: this.contracts
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFinancialValues();
      }
    });
  }

  deleteFinancialValue(id: number): void {
    this.financialValuesService.deleteFinancialValue(id).subscribe(
      () => {
        this.loadFinancialValues();
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
    this.dataSource.filterPredicate = (data: FinancialValue, filter: string): boolean => {
      return data.contract ? data.contract.toLowerCase().includes(filter) : false;
    };
    this.dataSource.filter = filterValue;
  }
}
