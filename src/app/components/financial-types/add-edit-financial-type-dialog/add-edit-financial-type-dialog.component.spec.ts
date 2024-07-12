import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFinancialTypeDialogComponent } from './add-edit-financial-type-dialog.component';

describe('AddEditFinancialTypeDialogComponent', () => {
  let component: AddEditFinancialTypeDialogComponent;
  let fixture: ComponentFixture<AddEditFinancialTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditFinancialTypeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditFinancialTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
