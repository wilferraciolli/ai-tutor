import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipList } from './recipe-list';

describe('RecipList', () => {
  let component: RecipList;
  let fixture: ComponentFixture<RecipList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
