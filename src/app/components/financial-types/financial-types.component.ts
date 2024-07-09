import { Component, OnInit } from '@angular/core';
import { FinancialTypesService } from '../../services/financial-types/financial-types.service';
import { FinancialType } from '../../models/financial-type.model';

@Component({
  selector: 'app-financial-types',
  templateUrl: './financial-types.component.html',
  styleUrls: ['./financial-types.component.css']
})
export class FinancialTypesComponent {
  financialTypes: FinancialType[] = [];
  displayedColumns: string[] = ['id', 'value', 'description'];

  constructor(private financialTypesService: FinancialTypesService) { }

  ngOnInit(): void {
    this.loadFinancialTypes();
  }

  loadFinancialTypes(): void {
    this.financialTypesService.getAll().subscribe(data => {
      this.financialTypes = data;
    });
  }
}
