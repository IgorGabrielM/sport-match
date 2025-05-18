import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideEventComponent } from './slide-event.component';

describe('SlideEventComponent', () => {
  let component: SlideEventComponent;
  let fixture: ComponentFixture<SlideEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
