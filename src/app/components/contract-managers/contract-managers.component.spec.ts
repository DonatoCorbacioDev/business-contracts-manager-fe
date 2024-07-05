import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractManagersComponent } from './contract-managers.component';

describe('ContractManagersComponent', () => {
  let component: ContractManagersComponent;
  let fixture: ComponentFixture<ContractManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractManagersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
