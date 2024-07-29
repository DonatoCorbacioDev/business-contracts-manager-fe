import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FinancialTypesService } from '../../services/financial-types/financial-types.service';
import { FinancialType } from '../../models/financial-type.model';
import { AddEditFinancialTypeDialogComponent } from './add-edit-financial-type-dialog/add-edit-financial-type-dialog.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-financial-types',
  templateUrl: './financial-types.component.html',
  styleUrls: ['./financial-types.component.css']
})
export class FinancialTypesComponent {
  financialTypes: FinancialType[] = [];
  displayedColumns: string[] = ['id', 'value', 'description', 'actions'];

  constructor(private financialTypesService: FinancialTypesService,
    private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadFinancialTypes();
  }

  loadFinancialTypes(): void {
    this.financialTypesService.getAll().subscribe(data => {
      this.financialTypes = data;
    });
  }

  addFinancialType(): void {
    const dialogRef = this.dialog.open(AddEditFinancialTypeDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFinancialTypes();
      }
    });
  }

  editFinancialType(financialType: FinancialType): void {
    const dialogRef = this.dialog.open(AddEditFinancialTypeDialogComponent, {
      width: '400px',
      data: financialType
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFinancialTypes();
      }
    });
  }

  deleteFinancialType(id: number): void {
    this.financialTypesService.deleteFinancialType(id).subscribe(
      () => {
        this.loadFinancialTypes();
        this.snackBar.open('Financial type successfully deleted', 'Close', {
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

  downloadCSV(): void {
    const csvData = this.convertToCSV(this.financialTypes);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'financial_types.csv');
  }

  convertToCSV(data: FinancialType[]): string {
    if (!data.length) {
      return '';
    }

    const headers = ['ID', 'Value', 'Description'];
    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = [
        row.id,
        row.value,
        row.description
      ];

      const escapedValues = values.map(value => `"${('' + value).replace(/"/g, '\\"')}"`);
      csvRows.push(escapedValues.join(','));
    }

    return csvRows.join('\n');
  }
}
