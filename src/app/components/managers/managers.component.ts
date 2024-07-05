import { Component, OnInit } from '@angular/core';
import { ManagersService } from '../../services/managers/managers.service';
import { Manager } from '../../models/manager.model';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrl: './managers.component.css'
})
export class ManagersComponent implements OnInit {

  managers: Manager[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'department'];

  constructor(private managersService: ManagersService) { }

  ngOnInit(): void {
    this.managersService.getAll().subscribe(data => {
      this.managers = data;
    });
  }

  loadManagers(): void {
    this.managersService.getAll().subscribe(data => {
      this.managers = data;
    });
  }
}
