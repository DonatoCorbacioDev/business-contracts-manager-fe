import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContractsService } from '../../services/contracts/contracts.service';
import { Contract } from '../../models/contract.model';
import { AddEditContractDialogComponent } from '../../components/contracts/add-edit-contract-dialog/add-edit-contract-dialog.component';

@Component({
  selector: 'app-contracts-select-view',
  templateUrl: './contracts-select-view.component.html',
  styleUrls: ['./contracts-select-view.component.css']
})
export class ContractsSelectViewComponent implements OnInit {

  contracts: Contract[] = [];
  selectedContract: Contract | null = null;
  displayedColumns: string[] = ['contract', 'projectName', 'actions'];

  constructor(private contractsService: ContractsService,
    private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadContracts();
  }

  loadContracts(): void {
    this.contractsService.getContracts().subscribe(data => {
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
      data: { ...contract, managerIds: contract.managers?.map(manager => manager.id) }
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
        this.snackBar.open('Contract successfully deleted', 'Close', {
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

  toggleDetails(contract: Contract): void {
    if (this.selectedContract && this.selectedContract.id === contract.id) {
      this.selectedContract = null;
    } else {
      this.selectedContract = contract;
    }
  }
}
