import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinancialTypesService } from '../../../services/financial-types/financial-types.service';
import { FinancialType } from '../../../models/financial-type.model';

@Component({
  selector: 'app-add-edit-financial-type-dialog',
  templateUrl: './add-edit-financial-type-dialog.component.html',
  styleUrls: ['./add-edit-financial-type-dialog.component.css']
})
export class AddEditFinancialTypeDialogComponent {

  financialTypeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private financialTypesService: FinancialTypesService,
    public dialogRef: MatDialogRef<AddEditFinancialTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FinancialType
  ) {
    this.financialTypeForm = this.fb.group({
      id: [ data ? data.id : null ],
      value: [data ? data.value : '', Validators.required],
      description: [data ? data.description : '', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.financialTypeForm.valid) {
      const financialType = this.financialTypeForm.getRawValue();
      if (financialType.id) {
        this.financialTypesService.updateFinancialType(financialType.id, financialType).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.financialTypesService.insertFinancialType(financialType).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
