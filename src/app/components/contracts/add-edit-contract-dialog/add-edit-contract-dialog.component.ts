import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContractsService } from '../../../services/contracts/contracts.service';
import { ManagersService } from '../../../services/managers/managers.service';
import { Contract } from '../../../models/contract.model';
import { Manager } from '../../../models/manager.model';

@Component({
  selector: 'app-add-edit-contract-dialog',
  templateUrl: './add-edit-contract-dialog.component.html',
  styleUrls: ['./add-edit-contract-dialog.component.css']
})
export class AddEditContractDialogComponent implements OnInit {
  contractForm: FormGroup;
  managers: Manager[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddEditContractDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contract,
    private fb: FormBuilder,
    private contractsService: ContractsService,
    private managersService: ManagersService
  ) {
    this.contractForm = this.fb.group({
      id: [data ? data.id : null],
      customer: [data ? data.customer : '', Validators.required],
      contract: [data ? data.contract : '', Validators.required],
      wbs: [data ? data.wbs : '', Validators.required],
      projectName: [data ? data.projectName : '', Validators.required],
      area: [data ? data.area : '', Validators.required],
      managerId: [data ? data.managerId : null, Validators.required]  // Aggiungi questo campo
    });
  }

  ngOnInit(): void {
    this.loadManagers();
  }

  loadManagers(): void {
    this.managersService.getAll().subscribe(data => {
      this.managers = data;
    });
  }

  onSave(): void {
    if (this.contractForm.valid) {
      const contract = this.contractForm.value;
      if (contract.id) {
        this.contractsService.updateContract(contract.id, contract).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.contractsService.insertContract(contract).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
