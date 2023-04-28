import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddTask: boolean = false; //to show or not the add-task component
  private subject = new Subject<any>();
  //A Subject is like an Observable, but can multicast to many Observers.
  //Subjects are like EventEmitters: they maintain a registry of many listeners.

  constructor() {}

  //call this when we click the add button
  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask; //toggle, if show was false it will turn to true
    this.subject.next(this.showAddTask);
    //emit new values to the observable stream using the next method
    //All the subscribers, who subscribe to the subject
    //will receive the same instance of the subject & hence the same values.
  }

  //to subscribe
  /*
  As a publisher, you create an Observable instance that defines a subscriber function.
  This is the function that is executed when a consumer calls the subscribe() method.
  */
  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
