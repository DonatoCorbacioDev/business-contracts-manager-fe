import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AreaService } from '../../services/area/area.service';
import { Area } from '../../models/area.model';
import { AddEditAreaDialogComponent } from './add-edit-area-dialog/add-edit-area-dialog.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  area: Area[] = [];
  displayedColumns: string[] = ['id', 'value', 'description', 'actions'];

  constructor(private areaService: AreaService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadArea();
  }

  loadArea(): void {
    this.areaService.getAll().subscribe(data => {
      this.area = data;
    });
  }

  addArea(): void {
    const dialogRef = this.dialog.open(AddEditAreaDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadArea();
      }
    });
  }

  editArea(area: Area): void {
    const dialogRef = this.dialog.open(AddEditAreaDialogComponent, {
      width: '400px',
      data: area
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadArea();
      }
    });
  }

  deleteArea(id: number): void {
    this.areaService.deleteArea(id).subscribe(
      () => {
        this.area = this.area.filter(area => area.id !== id);
        alert('Area successfully deleted');
      },
      error => {
        alert(`Error: ${error.message}`);
      }
    );
  }
}
