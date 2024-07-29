import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../models/user.model';
import { ManagersService } from '../../services/managers/managers.service';
import { RolesService } from '../../services/roles/roles.service';
import { Manager } from '../../models/manager.model';
import { Role } from '../../models/role.model';
import { AddEditUserDialogComponent } from './add-edit-user-dialog/add-edit-user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  managers: Manager[] = [];
  roles: Role[] = [];
  displayedColumns: string[] = ['id', 'username', 'manager', 'role', 'actions'];

  constructor(private usersService: UsersService,
              private managersService: ManagersService,
              private rolesService: RolesService,
              private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadManagers();
    this.loadRoles();
  }

  loadUsers(): void {
    this.usersService.getAll().subscribe(data => {
      this.users = data;
    });
  }

  loadManagers(): void {
    this.managersService.getAll().subscribe(data => {
      this.managers = data;
    });
  }

  loadRoles(): void {
    this.rolesService.getAll().subscribe(data => {
      this.roles = data;
    });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddEditUserDialogComponent, {
      width: '400px',
      data: {
        managers: this.managers,
        roles: this.roles
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(AddEditUserDialogComponent, {
      width: '400px',
      data: {
        user: user,
        managers: this.managers,
        roles: this.roles
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  deleteUser(id: number): void {
    this.usersService.delete(id).subscribe(
      () => {
        this.loadUsers();
        this.snackBar.open('User successfully deleted', 'Close', {
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
