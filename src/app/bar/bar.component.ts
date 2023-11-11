import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements OnInit {
  selectedOption: string = '';

  selectOption(option: string): void {
    this.selectedOption = option;
  }

  constructor() {}
  ngOnInit(): void {}
}
