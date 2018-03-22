import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceExplorerComponent } from './resource-explorer.component';

describe('ResourceExplorerComponent', () => {
  let component: ResourceExplorerComponent;
  let fixture: ComponentFixture<ResourceExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
