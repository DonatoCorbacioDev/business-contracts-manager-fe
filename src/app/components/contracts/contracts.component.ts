import { Component, OnInit } from '@angular/core';
import { ContractsService } from '../../services/contracts/contracts.service'; 
import { Contract } from '../../models/contract.model';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {
  contracts: Contract[] = [];
  displayedColumns: string[] = ['id', 'customer', 'contract', 'wbs', 'projectName', 'area'];

  constructor(private contractsService: ContractsService) { }

  ngOnInit(): void {
    this.loadContracts();
  }

  loadContracts(): void {
    this.contractsService.getAll().subscribe(data => {
      this.contracts = data;
    });
  }
}
