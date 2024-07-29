import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../../models/role.model';

@Component({
  selector: 'app-add-edit-role-dialog',
  templateUrl: './add-edit-role-dialog.component.html',
  styleUrls: ['./add-edit-role-dialog.component.css']
})
export class AddEditRoleDialogComponent {
  roleForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Role,
    private fb: FormBuilder
  ) {
    this.roleForm = this.fb.group({
      id: [data.id],
      role: [data.role, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      this.dialogRef.close(this.roleForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
