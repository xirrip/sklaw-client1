import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTagItemDialogComponent } from './new-tag-item-dialog.component';

describe('NewTagItemDialogComponent', () => {
  let component: NewTagItemDialogComponent;
  let fixture: ComponentFixture<NewTagItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTagItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTagItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
