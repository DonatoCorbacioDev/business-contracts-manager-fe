import { Component, OnInit } from '@angular/core';
import { FinancialValuesService } from '../../services/financial-values/financial-values.service';
import { FinancialValue } from '../../models/financial-value.model';

@Component({
  selector: 'app-financial-values',
  templateUrl: './financial-values.component.html',
  styleUrls: ['./financial-values.component.css']
})
export class FinancialValuesComponent implements OnInit {
  financialValues: FinancialValue[] = [];
  displayedColumns: string[] = ['id', 'month', 'year', 'value', 'financialTypeId', 'areaId', 'contractId'];


  constructor(private financialValuesService: FinancialValuesService) { }

  ngOnInit(): void {
    this.loadFinancialValues();
  }

  loadFinancialValues(): void {
    this.financialValuesService.getAll().subscribe(data => {
      this.financialValues = data;
    });
  }
}