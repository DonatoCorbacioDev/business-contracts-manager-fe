import { Component, OnInit } from '@angular/core';
import { ContractManagersService } from '../../services/contract-managers/contract-managers.service';
import { ContractManagerAssignment } from '../../models/contract-manager-assignment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contract-managers',
  templateUrl: './contract-managers.component.html',
  styleUrls: ['./contract-managers.component.css'] 
})
export class ContractManagersComponent implements OnInit {
  assignmentForm: FormGroup;
  message: string | null = null;

  constructor(
    private fb: FormBuilder,
    private contractManagersService: ContractManagersService
  ) {
    this.assignmentForm = this.fb.group({
      contractId: [null, Validators.required],
      managerIds: [null, Validators.required] 
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.assignmentForm.valid) {
      const assignment: ContractManagerAssignment = {
        contractId: this.assignmentForm.value.contractId,
        managerIds: this.assignmentForm.value.managerIds.split(',').map((id: string) => +id.trim())
      };

      this.contractManagersService.assignManagers(assignment).subscribe(
        response => {
          this.message = 'Managers assigned successfully!';
        },
        error => {
          this.message = 'Failed to assign managers. Error: ' + error;
          console.error('Error assigning managers:', error);
        }
      );
    }
  }
}
