import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() text: string;
  @Input() color: string;
  //https://stackoverflow.com/questions/64874221/
  //property-has-no-initializer-and-is-not-definitely-assigned-in-the-constructor

  @Output() btnClick = new EventEmitter();

  onClick() {
    this.btnClick.emit();
    /*
    we are emiting (with EventEmitter) this button click that we set up above (with @Output)
    and catching it in "header.component.html", after cathing it we fire off the function "toggleAddTask()"
    then "toggleAddTask()" is executed in the class file "header.component.ts"
    */
  }
}
