import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgmDatasetsBannerComponent } from './dgm-datasets-banner.component';

describe('DgmDatasetsBannerComponent', () => {
  let component: DgmDatasetsBannerComponent;
  let fixture: ComponentFixture<DgmDatasetsBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgmDatasetsBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgmDatasetsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
