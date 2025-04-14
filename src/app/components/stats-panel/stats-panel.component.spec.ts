import {ComponentFixture} from '@angular/core/testing';
import {MockBuilder, MockRender, ngMocks} from 'ng-mocks';
import {StatsPanelComponent} from './stats-panel.component';

describe('StatsPanelComponent', () => {
  let fixture: ComponentFixture<StatsPanelComponent>;
  let component: StatsPanelComponent;

  beforeEach(() => {
    return MockBuilder(StatsPanelComponent);
  });

  beforeEach(() => {
    fixture = MockRender(StatsPanelComponent, {stats: {wins: 0, streak: 0, avgAttempts: 0}});
    component = ngMocks.findInstance(StatsPanelComponent);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the stats correctly', () => {
    component.stats = {wins: 10, streak: 5, avgAttempts: 3};
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Statistiques');
    const paragraphs = compiled.querySelectorAll('p');
    expect(paragraphs[0].textContent).toContain('Victoires: 10');
    expect(paragraphs[1].textContent).toContain('Série: 5');
    expect(paragraphs[2].textContent).toContain('Tentatives moyennes: 3');
  });
});
