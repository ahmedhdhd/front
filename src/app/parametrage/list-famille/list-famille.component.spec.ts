import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFamilleComponent } from './list-famille.component';

describe('ListFamilleComponent', () => {
  let component: ListFamilleComponent;
  let fixture: ComponentFixture<ListFamilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFamilleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
