import {ComponentFixture} from '@angular/core/testing';
import {MockBuilder, MockRender, ngMocks} from 'ng-mocks';
import {GameBoardComponent} from './game-board.component';

describe('GameBoardComponent', () => {
  let fixture: ComponentFixture<GameBoardComponent>;
  let component: GameBoardComponent;

  beforeEach(() => {
    return MockBuilder(GameBoardComponent);
  });

  beforeEach(() => {
    fixture = MockRender(GameBoardComponent);
    component = ngMocks.findInstance(GameBoardComponent);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the board correctly', () => {
    component.board = [
      [{char: 'A', color: 'red'}, {char: 'B', color: 'blue'}],
      [{char: 'C', color: 'green'}, {char: 'D', color: 'yellow'}]
    ];

    fixture.detectChanges();

    const cells = fixture.nativeElement.querySelectorAll('.w-10.h-10');
    expect(cells.length).toBe(4);
    expect(cells[0].textContent.trim()).toBe('A');
    expect(cells[1].textContent.trim()).toBe('B');
    expect(cells[2].textContent.trim()).toBe('C');
    expect(cells[3].textContent.trim()).toBe('D');
  });

  it('should call getClass for each cell with the correct color', () => {
    const getClassSpy = spyOn(component, 'getClass').and.callThrough();

    component.board = [
      [{char: 'X', color: 'purple'}],
      [{char: 'Y', color: 'orange'}]
    ];

    fixture.detectChanges();

    expect(getClassSpy.calls.count()).toBe(4);

    const calls = getClassSpy.calls.allArgs();
    const purpleCalls = calls.filter(args => args[0] === 'purple').length;
    const orangeCalls = calls.filter(args => args[0] === 'orange').length;

    expect(purpleCalls).toBe(2);
    expect(orangeCalls).toBe(2);
  });
});
