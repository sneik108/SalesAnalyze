import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeParentComponent } from './analyze-parent.component';

describe('AnalyzeParentComponent', () => {
  let component: AnalyzeParentComponent;
  let fixture: ComponentFixture<AnalyzeParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzeParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
