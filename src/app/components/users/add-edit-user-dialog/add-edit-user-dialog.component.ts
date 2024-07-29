import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users/users.service';
import { User } from '../../../models/user.model';
import { Manager } from '../../../models/manager.model';
import { Role } from '../../../models/role.model';

@Component({
  selector: 'app-add-edit-user-dialog',
  templateUrl: './add-edit-user-dialog.component.html',
  styleUrls: ['./add-edit-user-dialog.component.css']
})
export class AddEditUserDialogComponent implements OnInit {

  form: FormGroup;
  managers: Manager[];
  roles: Role[];

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<AddEditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.managers = data.managers;
    this.roles = data.roles;
    this.form = this.fb.group({
      id: [data.user ? data.user.id : null],
      username: [data.user ? data.user.username : '', Validators.required],
      password: [data.user ? data.user.password : '', Validators.required],
      manager: [data.user ? data.user.manager : null, Validators.required],
      role: [data.user ? data.user.role : null, Validators.required]
    });
  }

  ngOnInit(): void { }

  save(): void {
    if (this.form.valid) {
      const user: User = this.form.value;
      if (user.id) {
        this.usersService.update(user).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.usersService.insert(user).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
