import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FinancialTypesService } from '../../services/financial-types/financial-types.service';
import { FinancialType } from '../../models/financial-type.model';
import { AddEditFinancialTypeDialogComponent } from './add-edit-financial-type-dialog/add-edit-financial-type-dialog.component';

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
}
