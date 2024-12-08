import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanneldashbaordComponent } from './channeldashbaord.component';

describe('ChanneldashbaordComponent', () => {
  let component: ChanneldashbaordComponent;
  let fixture: ComponentFixture<ChanneldashbaordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChanneldashbaordComponent]
    });
    fixture = TestBed.createComponent(ChanneldashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
