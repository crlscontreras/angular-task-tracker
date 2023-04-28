import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  @Input() task: Task; //this is a property of the component app-task-item, we now have access to a Task object
  //the functions that have to do with calling the service
  //are going to be in the "task" component (the parent), not here
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter(); //so we are going to emmit an event
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();

  faTimes = faTimes; //icon

  onDelete(task: Task) {
    this.onDeleteTask.emit(task);
  }

  onToggle(task: Task) {
    this.onToggleReminder.emit(task);
  }
}
