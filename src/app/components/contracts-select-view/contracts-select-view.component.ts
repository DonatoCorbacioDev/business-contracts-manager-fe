import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContractsService } from '../../services/contracts/contracts.service';
import { AuthService } from '../../services/auth/auth.service';
import { Contract } from '../../models/contract.model';
import { AddEditContractDialogComponent } from '../../components/contracts/add-edit-contract-dialog/add-edit-contract-dialog.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-contracts-select-view',
  templateUrl: './contracts-select-view.component.html',
  styleUrls: ['./contracts-select-view.component.css']
})
export class ContractsSelectViewComponent implements OnInit {

  contracts: Contract[] = [];
  selectedContract: Contract | null = null;
  displayedColumns: string[] = ['contract', 'projectName', 'actions'];
  isAdmin: boolean = false;

  constructor(private contractsService: ContractsService, private authService: AuthService,
    private snackBar: MatSnackBar, private dialog: MatDialog) { }

    ngOnInit(): void {
      this.isAdmin = this.authService.getRoleString() === 'Amministratore';
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

  downloadCSV(): void {
    const csvData = this.convertToCSV(this.contracts);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'contracts.csv');
  }

  convertToCSV(data: Contract[]): string {
    if (!data.length) {
      return '';
    }

    const headers = [
      'ID', 
      'Customer', 
      'Contract', 
      'Project Name', 
      'Area', 
      'Managers'
    ];
    
    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = [
        row.id,
        row.customer,
        row.contract,
        row.projectName,
        row.area,
        row.managers ? row.managers.map(manager => `${manager.firstName} ${manager.lastName}`).join(', ') : ''
      ];
      
      const escapedValues = values.map(value => `"${('' + value).replace(/"/g, '\\"')}"`);
      csvRows.push(escapedValues.join(','));
    }

    return csvRows.join('\n');
  }
}

