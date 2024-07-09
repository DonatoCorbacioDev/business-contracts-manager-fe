import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContractsService } from '../../services/contracts/contracts.service'; 
import { Contract } from '../../models/contract.model';
import { AddEditContractDialogComponent } from './add-edit-contract-dialog/add-edit-contract-dialog.component';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {
  contracts: Contract[] = [];
  displayedColumns: string[] = ['id', 'customer', 'contract', 'wbs', 'projectName', 'area', 'actions'];

  constructor(private contractsService: ContractsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadContracts();
  }

  loadContracts(): void {
    this.contractsService.getAll().subscribe(data => {
      this.contracts = data;
    });
  }

  addContract(): void {
    const dialogRef = this.dialog.open(AddEditContractDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadContracts();
      }
    });
  }

  editContract(contract: Contract): void {
    const dialogRef = this.dialog.open(AddEditContractDialogComponent, {
      width: '400px',
      data: contract
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadContracts();
      }
    });
  }

  deleteContract(id: number): void {
    this.contractsService.deleteContract(id).subscribe(
      () => {
        this.loadContracts();
        alert('Contract successfully deleted');
      },
      (error) => {
        if (error.status === 409) {
          alert('Cannot delete contract: it has related financial values');
        } else {
          alert('Internal server error');
        }
      }
    );
  }
}
  
