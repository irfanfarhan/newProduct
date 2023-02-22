import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredCardsComponent } from './stored-cards.component';

describe('StoredCardsComponent', () => {
  let component: StoredCardsComponent;
  let fixture: ComponentFixture<StoredCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoredCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoredCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
