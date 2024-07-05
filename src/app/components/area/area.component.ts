import { Component, OnInit } from '@angular/core';
import { AreaService } from '../../services/area/area.service';
import { Area } from '../../models/area.model';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrl: './area.component.css'
})
export class AreaComponent {
  area: Area[] = [];
  displayedColumns: string[] = ['id', 'value', 'description'];

  constructor(private areaService: AreaService) { }

  ngOnInit(): void {
    this.loadArea();
  }

  loadArea(): void {
    this.areaService.getAll().subscribe(data => {
      this.area = data;
    });
  }
}
