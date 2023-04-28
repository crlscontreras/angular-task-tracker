import { Component } from '@angular/core'; //we import "component" from core

//component declaration

/*
  selector: the html tag/element that you are going to use to embed the component,
  templateUrl: the html file that we are using,
  styleUrls: the css styles that we are using,
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
