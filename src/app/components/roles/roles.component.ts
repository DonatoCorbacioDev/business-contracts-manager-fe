import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolesService } from '../../services/roles/roles.service';
import { Role } from '../../models/role.model';
import { AddEditRoleDialogComponent } from './add-edit-role-dialog/add-edit-role-dialog.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles: Role[] = [];
  displayedColumns: string[] = ['id', 'role', 'actions'];

  constructor(private rolesService: RolesService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.rolesService.getAll().subscribe(data => {
      this.roles = data.sort((a, b) => a.id - b.id);
    });
  }

  addRole(): void {
    const dialogRef = this.dialog.open(AddEditRoleDialogComponent, {
      width: '400px',
      data: { id: null, role: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rolesService.insert(result).subscribe(
          () => {
            this.loadRoles();
          }
        );
      }
    });
  }

  editRole(role: Role): void {
    const dialogRef = this.dialog.open(AddEditRoleDialogComponent, {
      width: '400px',
      data: role
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rolesService.update(result).subscribe(
          () => {
            this.loadRoles();
          }
        );
      }
    });
  }

  deleteRole(id: number): void {
    this.rolesService.delete(id).subscribe(
      () => {
        this.loadRoles();
        this.snackBar.open('Role successfully deleted', 'Close', {
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
}
