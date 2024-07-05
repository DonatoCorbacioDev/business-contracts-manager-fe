import { Component, OnInit } from '@angular/core';
import { ContractManagersService } from '../../services/contract-managers/contract-managers.service';
import { ContractManagerAssignment } from '../../models/contract-manager-assignment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contract-managers',
  templateUrl: './contract-managers.component.html',
  styleUrl: './contract-managers.component.css'
})
export class ContractManagersComponent implements OnInit {
  assignmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contractManagersService: ContractManagersService
  ) {
    this.assignmentForm = this.fb.group({
      contractId: [null, Validators.required],
      managerId: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.assignmentForm.valid) {
      const assignment: ContractManagerAssignment = this.assignmentForm.value;
      this.contractManagersService.assignManagers(assignment).subscribe(response => {
        console.log('Managers assigned:', response);
      });
    }
  }
}
