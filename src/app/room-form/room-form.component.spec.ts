import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RoomFormComponent } from './room-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RoomService } from '../services/room.service';
import { ConsoleSpy } from 'src/utils';

class MockRoomService {
  getPrice(price: number, numberOfNights: number, extraCost: number): number {
    return price + numberOfNights + extraCost;
  }
}


fdescribe('RoomFormComponent', () => {
  let component: RoomFormComponent;
  let fixture: ComponentFixture<RoomFormComponent>;
  let originalConsole, fakeConsole;
  let el, input, form;

  beforeEach(async () => {
    fakeConsole = new ConsoleSpy();
    originalConsole = window.console;
    (<any>window).console = fakeConsole;

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      declarations: [RoomFormComponent],
      providers: [{ provide: RoomService, useClass: MockRoomService }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    input = fixture.debugElement.query(By.css('input')).nativeElement;
    form = fixture.debugElement.query(By.css('form')).nativeElement;
    fixture.detectChanges();
  });

  afterAll(() => {
    (<any>window).console = originalConsole;
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('logs a warning when room name has less than 6 characters', fakeAsync(() => {
    const nameInput = fixture.debugElement.query(By.css('input#name')).nativeElement;

    nameInput.value = 'ABC';
    nameInput.dispatchEvent(new Event('input'));
    tick();

    expect(fakeConsole.logs.some((log) =>
      log.includes('Room name has length < 6')
      && log.includes('ABC'))).toBeTrue();
  }));

});