import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmtionComponent } from './delete-confirmtion.component';

describe('DeleteConfirmtionComponent', () => {
  let component: DeleteConfirmtionComponent;
  let fixture: ComponentFixture<DeleteConfirmtionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DeleteConfirmtionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
