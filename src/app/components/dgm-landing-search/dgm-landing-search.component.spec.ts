import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgmLandingSearchComponent } from './dgm-landing-search.component';

describe('DgmLandingSearchComponent', () => {
  let component: DgmLandingSearchComponent;
  let fixture: ComponentFixture<DgmLandingSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgmLandingSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgmLandingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
