import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Task'; //interface
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  /*
  Instead of creating that service with the "new" keyword,
  we use the "dependency injection"
  Dependency Injection is a technique in which a class receives its dependencies
  from external sources rather than creating them itself
  
  we need an instance of taskService:
  if we ask for it in the constructor, Angular will Inject it
  In order to inject an instance taskService:
  1)we create a constructor
  2)inside it we create a private parameter "taskService" of type TaskService
  Angular will know what service to inject thanks to the type
  
  3) we will recive an instance of "TaskService" class in the private parameter
  4)then we use that instance to call the function getTasks()

  in summary:
  When Angular creates a tasksComponent,
  the Dependency Injection system injects an instance taskService
  meaning: it sets the private parameter "taskService" to the singleton instance of taskService.  
  */
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
    /*
  wait for the Observable to emit the array of tasks,
  (which could happen now or several minutes from now)
  then asign it to this.tasks
  
  The subscribe() method passes the emitted array to the callback, which sets the component's tasks (this.tasks) property.

  This asynchronous approach works when the "TaskService" requests "tasks" from the server.
  */
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
    //we dont get anything from the return of deleteTask() (empty arrow function)
    //but we do want to update the UI
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
    //the post request returns a task
    //we update the UI with that
  }
}
