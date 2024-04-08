import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDrawerComponent } from './create-drawer.component';

describe('CreateDrawerComponent', () => {
  let component: CreateDrawerComponent;
  let fixture: ComponentFixture<CreateDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDrawerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
