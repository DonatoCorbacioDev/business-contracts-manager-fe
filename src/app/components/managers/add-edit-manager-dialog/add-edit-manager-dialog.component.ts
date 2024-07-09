import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManagersService } from '../../../services/managers/managers.service';
import { Manager } from '../../../models/manager.model';

@Component({
  selector: 'app-add-edit-manager-dialog',
  templateUrl: './add-edit-manager-dialog.component.html',
  styleUrls: ['./add-edit-manager-dialog.component.css']
})
export class AddEditManagerDialogComponent implements OnInit {
  managerForm: FormGroup;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private managersService: ManagersService,
    public dialogRef: MatDialogRef<AddEditManagerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Manager
  ) {
    this.managerForm = this.fb.group({
      firstName: [data ? data.firstName : '', Validators.required],
      lastName: [data ? data.lastName : '', Validators.required],
      email: [data ? data.email : '', [Validators.required, Validators.email]],
      phoneNumber: [data ? data.phoneNumber : '', Validators.required],
      department: [data ? data.department : '', Validators.required]
    });

    if (data && data.id) {
      this.isEdit = true;
    }
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.managerForm.valid) {
      const manager: Manager = {
        ...this.data,
        ...this.managerForm.value
      };

      if (this.isEdit) {
        this.managersService.updateManager(manager).subscribe(
          () => {
            this.dialogRef.close(true);
          },
          error => console.error('Error updating manager:', error)
        );
      } else {
        this.managersService.insertManager(manager).subscribe(
          () => {
            this.dialogRef.close(true);
          },
          error => console.error('Error creating manager:', error)
        );
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
