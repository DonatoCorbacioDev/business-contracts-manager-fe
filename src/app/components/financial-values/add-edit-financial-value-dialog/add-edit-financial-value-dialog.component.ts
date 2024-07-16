import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinancialValuesService } from '../../../services/financial-values/financial-values.service';
import { FinancialType } from '../../../models/financial-type.model';
import { Area } from '../../../models/area.model';
import { Contract } from '../../../models/contract.model';

@Component({
  selector: 'app-add-edit-financial-value-dialog',
  templateUrl: './add-edit-financial-value-dialog.component.html',
  styleUrls:  ['./add-edit-financial-value-dialog.component.css']
})
export class AddEditFinancialValueDialogComponent implements OnInit {

  financialValueForm: FormGroup;
  financialTypes: FinancialType[];
  areas: Area[];
  contracts: Contract[];
  isEdit: boolean = false;
  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  years: number[] = [];

  constructor(
    private fb: FormBuilder,
    private financialValuesService: FinancialValuesService,
    public dialogRef: MatDialogRef<AddEditFinancialValueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.financialTypes = data.financialTypes;
    this.areas = data.areas;
    this.contracts = data.contracts;
    const financialValue = data.financialValue || {};

    this.isEdit = !!financialValue.id;

    this.financialValueForm = this.fb.group({
      id: [financialValue.id || ''],
      month: [financialValue.month || '', Validators.required],
      year: [financialValue.year || '', Validators.required],
      value: [financialValue.value || '', Validators.required],
      financialTypeId: [financialValue.financialTypeId || '', Validators.required],
      areaId: [financialValue.areaId || '', Validators.required],
      contractId: [financialValue.contractId || '', Validators.required]
    });

    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      this.years.push(i);
    }
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.financialValueForm.valid) {
      const financialValue = this.financialValueForm.value;
      if (this.isEdit) {
        this.financialValuesService.updateFinancialValue(financialValue.id, financialValue).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.financialValuesService.insertFinancialValue(financialValue).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
