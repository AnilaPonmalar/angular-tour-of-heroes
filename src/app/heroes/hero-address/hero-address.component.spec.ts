import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAddressComponent } from './hero-address.component';

describe('HeroAddressComponent', () => {
  let component: HeroAddressComponent;
  let fixture: ComponentFixture<HeroAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
