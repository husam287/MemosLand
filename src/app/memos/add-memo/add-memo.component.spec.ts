import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemoComponent } from './add-memo.component';

describe('AddMemoComponent', () => {
  let component: AddMemoComponent;
  let fixture: ComponentFixture<AddMemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
