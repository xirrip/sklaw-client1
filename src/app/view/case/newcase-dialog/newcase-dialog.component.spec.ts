import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcaseDialogComponent } from './newcase-dialog.component';

describe('NewcaseDialogComponent', () => {
  let component: NewcaseDialogComponent;
  let fixture: ComponentFixture<NewcaseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcaseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
