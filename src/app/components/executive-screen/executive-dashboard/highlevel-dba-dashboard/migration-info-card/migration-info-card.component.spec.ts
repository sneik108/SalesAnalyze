import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrationInfoCardComponent } from './migration-info-card.component';

describe('MigrationInfoCardComponent', () => {
  let component: MigrationInfoCardComponent;
  let fixture: ComponentFixture<MigrationInfoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigrationInfoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrationInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
