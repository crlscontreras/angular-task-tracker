import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
//this file is: the declaration of the component Header, the class
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title: string = 'task-tracker';
  showAddTask: boolean = false;
  subscription: Subscription;

  //in order to use a service we have to add it to the constructor
  constructor(private uiService: UiService, private router: Router) {
    //the toggleAddTask() function from this file calls the toggleAddTask() function in the service
    //it changes the value of showAddTask (in the service) to the opposite value
    //we send that new value with subject.next(this.showAddTask) to the observable stream
    //we are subscribe to this observable, so everytime it changes, the subscribe() gets called

    //the method inside subscribe() gets called everytime there is a new value (subject.next(new value))
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  toggleAddTask() {
    this.uiService.toggleAddTask();
  }

  hasRoute(route: string) {
    //we have access to router thanks to "Router" in the constructor
    return this.router.url === route;
  }
}
