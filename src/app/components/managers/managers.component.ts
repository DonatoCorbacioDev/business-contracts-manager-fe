import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManagersService } from '../../services/managers/managers.service';
import { Manager } from '../../models/manager.model';
import { AddEditManagerDialogComponent } from './add-edit-manager-dialog/add-edit-manager-dialog.component';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {

  managers: Manager[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'department', 'actions'];

  constructor(private managersService: ManagersService, private dialog: MatDialog) { }

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
        alert('Manager successfully deleted');
      },
      (error) => {
        if (error.status === 409) {
          alert('Cannot delete manager: it has related entities');
        } else {
          alert('Internal server error');
        }
      }
    );
  }
}
