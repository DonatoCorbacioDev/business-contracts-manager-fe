import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialTypesComponent } from './financial-types.component';

describe('FinancialTypesComponent', () => {
  let component: FinancialTypesComponent;
  let fixture: ComponentFixture<FinancialTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
