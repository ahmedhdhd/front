import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFamilleComponent } from './add-edit-famille.component';

describe('AddEditFamilleComponent', () => {
  let component: AddEditFamilleComponent;
  let fixture: ComponentFixture<AddEditFamilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFamilleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditFamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
