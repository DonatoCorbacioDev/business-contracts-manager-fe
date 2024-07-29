import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AreaService } from '../../services/area/area.service';
import { Area } from '../../models/area.model';
import { AddEditAreaDialogComponent } from './add-edit-area-dialog/add-edit-area-dialog.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  area: Area[] = [];
  displayedColumns: string[] = ['id', 'value', 'description', 'actions'];

  constructor(private areaService: AreaService,
    private snackBar: MatSnackBar, private dialog: MatDialog) { }

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
        this.loadArea();
        this.snackBar.open('Area successfully deleted', 'Close', {
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

  downloadCSV(): void {
    const csvData = this.convertToCSV(this.area);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'areas.csv');
  }

  convertToCSV(data: Area[]): string {
    if (!data.length) {
      return '';
    }

    const headers = ['ID', 'Value', 'Description'];
    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = [
        row.id,
        row.value,
        row.description
      ];

      const escapedValues = values.map(value => `"${('' + value).replace(/"/g, '\\"')}"`);
      csvRows.push(escapedValues.join(','));
    }

    return csvRows.join('\n');
  }
}
