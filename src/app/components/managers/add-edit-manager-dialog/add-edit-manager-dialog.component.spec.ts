import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditManagerDialogComponent } from './add-edit-manager-dialog.component';

describe('AddEditManagerDialogComponent', () => {
  let component: AddEditManagerDialogComponent;
  let fixture: ComponentFixture<AddEditManagerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditManagerDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditManagerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
