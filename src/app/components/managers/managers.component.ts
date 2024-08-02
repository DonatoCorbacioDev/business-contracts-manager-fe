import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManagersService } from '../../services/managers/managers.service';
import { Manager } from '../../models/manager.model';
import { AddEditManagerDialogComponent } from './add-edit-manager-dialog/add-edit-manager-dialog.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {

  managers: Manager[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'department', 'actions'];

  constructor(private managersService: ManagersService, 
    private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadManagers();
  }

  loadManagers(): void {
    this.managersService.getAll().subscribe(data => {
      this.managers = data;
    });
  }

  addManager(): void {
    const dialogRef = this.dialog.open(AddEditManagerDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadManagers();
      }
    });
  }

  editManager(manager: Manager): void {
    const dialogRef = this.dialog.open(AddEditManagerDialogComponent, {
      width: '400px',
      data: manager
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadManagers();
      }
    });
  }

  deleteManager(id: number): void {
    this.managersService.deleteManager(id).subscribe(
      () => {
        this.loadManagers();
        this.snackBar.open('User successfully deleted', 'Close', {
          duration: 3000,
        });
      },
      () => {
        this.snackBar.open('Cannot delete user', 'Close', {
          duration: 5000,
        });
      }
    );
  }

  downloadCSV(): void {
    const csvData = this.convertToCSV(this.managers);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'users.csv');
  }

  convertToCSV(data: Manager[]): string {
    if (!data.length) {
      return '';
    }

    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Phone Number', 'Department'];
    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = [
        row.id,
        row.firstName,
        row.lastName,
        row.email,
        row.phoneNumber,
        row.department
      ];

      const escapedValues = values.map(value => `"${('' + value).replace(/"/g, '\\"')}"`);
      csvRows.push(escapedValues.join(','));
    }

    return csvRows.join('\n');
  }
}
