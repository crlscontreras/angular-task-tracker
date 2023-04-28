import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/app/Task'; //interface
/*
Components should focus on presenting data
and delegate data access to: a service
  Removing data access from components means
  you can change your mind about the implementation anytime,
  without touching any components.
  The components don't know how the service works.

so we create a "TaskService" that all application classes can use to get tasks
*/

//options: used to configure the HTTP request
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

/*
@Injectable() services:
we annotate (@) the class with the Injectable() decorator.
This marks the class as one that participates in the dependency injection system.

The TaskService class is going to provide an injectable service
*/
@Injectable({
  providedIn: 'root',
  /*
  provider: used to make a Service available to the dependency injection system
  When you provide the service at the root level,
  Angular creates a single, shared instance of TaskService
  and injects into any class that asks for it.
  */
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks'; //the service/API endpoint URL of type string.
  constructor(private http: HttpClient) {}

  /*
  The TaskService could get task data from anywhere such:
  as a web service, local storage, or a mock data source.

  TaskService.getTasks() must have an asynchronous signature of some kind: Observable 
  
  we are simulating getting data from the server with the RxJS of() function.
  const tasks = of(TASKS);
  of(TASKS) returns an Observable<Task[]> that emits a single value, the array of mock tasks.

  HttpClient.get returns an Observable<Task[]>, so we dont need the of() function
  */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }
}
