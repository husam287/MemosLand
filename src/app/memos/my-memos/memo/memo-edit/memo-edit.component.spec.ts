import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoEditComponent } from './memo-edit.component';

describe('MemoEditComponent', () => {
  let component: MemoEditComponent;
  let fixture: ComponentFixture<MemoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
