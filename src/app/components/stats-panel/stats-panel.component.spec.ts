import {ComponentFixture} from '@angular/core/testing';
import {MockBuilder, MockRender} from 'ng-mocks';
import {StatsPanelComponent} from './stats-panel.component';

describe('StatsPanelComponent', () => {
  let fixture: ComponentFixture<StatsPanelComponent>;
  let component: StatsPanelComponent;

  beforeEach(async () => {
    await MockBuilder(StatsPanelComponent);
    fixture = MockRender(StatsPanelComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default stats', () => {
    const html = fixture.nativeElement as HTMLElement;
    expect(html.textContent).toContain('Wins');
    expect(html.textContent).toContain('0');
  });

  it('should render passed stats correctly', () => {
    component.stats = {wins: 5, streak: 2, avgAttempts: 3};
    fixture.detectChanges();

    const html = fixture.nativeElement as HTMLElement;
    expect(html.textContent).toContain('5');
    expect(html.textContent).toContain('2');
    expect(html.textContent).toContain('3');
  });
});
