import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCRUDComponent } from './admin-crud.component';

describe('AdminCRUDComponent', () => {
  let component: AdminCRUDComponent;
  let fixture: ComponentFixture<AdminCRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCRUDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
