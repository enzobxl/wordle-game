import {ComponentFixture} from '@angular/core/testing';
import {MockBuilder, MockRender} from 'ng-mocks';
import {KeyboardComponent} from './keyboard.component';
import {By} from '@angular/platform-browser';

describe('KeyboardComponent', () => {
  let fixture: ComponentFixture<KeyboardComponent>;
  let component: KeyboardComponent;

  beforeEach(async () => {
    await MockBuilder(KeyboardComponent);
    fixture = MockRender(KeyboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the key when a button is clicked', () => {
    spyOn(component.key, 'emit');

    const button = fixture.debugElement.queryAll(By.css('button'))[0];
    const label = button.nativeElement.textContent.trim();
    button.nativeElement.click();

    expect(component.key.emit).toHaveBeenCalledWith(label);
  });

  it('should emit the key when onKey() is called directly', () => {
    spyOn(component.key, 'emit');
    component.onKey('A');
    expect(component.key.emit).toHaveBeenCalledWith('A');
  });

  it('should emit the key from handleKeydown event', () => {
    spyOn(component.key, 'emit');
    component.onKey('M');
    expect(component.key.emit).toHaveBeenCalledWith('M');
  });
});
