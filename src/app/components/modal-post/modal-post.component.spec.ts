import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPostComponent } from './modal-post.component';

describe('ModalPostComponent', () => {
  let component: ModalPostComponent;
  let fixture: ComponentFixture<ModalPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
