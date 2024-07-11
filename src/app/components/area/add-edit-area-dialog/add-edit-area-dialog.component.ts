import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AreaService } from '../../../services/area/area.service';
import { Area } from '../../../models/area.model';

@Component({
  selector: 'app-add-edit-area-dialog',
  templateUrl: './add-edit-area-dialog.component.html',
  styleUrls: ['./add-edit-area-dialog.component.css']
})
export class AddEditAreaDialogComponent implements OnInit {

  areaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private areaService: AreaService,
    public dialogRef: MatDialogRef<AddEditAreaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Area
  ) {
    this.areaForm = this.fb.group({
      id: [ data ? data.id : null ],
      value: [data ? data.value : '', Validators.required],
      description: [data ? data.description : '', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.areaForm.valid) {
      const area = this.areaForm.getRawValue();
      if (area.id) {
        this.areaService.updateArea(area.id, area).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.areaService.insertArea(area).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
