import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text: string;
  day: string;
  reminder: boolean = false;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  onSubmit() {
    //validation, check if text exist
    if (!this.text) {
      alert('Please add a task!');
      return;
    }

    //create object
    const newTask: Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    //emit the object to the parent component "task"
    this.onAddTask.emit(newTask);

    //clear form
    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
