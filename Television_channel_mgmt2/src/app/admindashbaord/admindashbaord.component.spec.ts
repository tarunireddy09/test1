import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindashbaordComponent } from './admindashbaord.component';

describe('AdmindashbaordComponent', () => {
  let component: AdmindashbaordComponent;
  let fixture: ComponentFixture<AdmindashbaordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmindashbaordComponent]
    });
    fixture = TestBed.createComponent(AdmindashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
