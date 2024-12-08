import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiesmentdashboardComponent } from './advertiesmentdashboard.component';

describe('AdvertiesmentdashboardComponent', () => {
  let component: AdvertiesmentdashboardComponent;
  let fixture: ComponentFixture<AdvertiesmentdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertiesmentdashboardComponent]
    });
    fixture = TestBed.createComponent(AdvertiesmentdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
