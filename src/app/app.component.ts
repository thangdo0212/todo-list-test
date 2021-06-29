import { Component, OnInit } from '@angular/core';
import { Task } from 'src/model/type';
import { TodoListService } from 'src/service/todo-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public taskList: any[] = []

  constructor(private todoListService: TodoListService) {
    const item = localStorage.getItem('tasks');
    this.taskList = item ? JSON.parse(item) : [];
  }
  ngOnInit(): void {
    if (this.todoListService.subsVar == undefined) {    
      this.todoListService.subsVar = this.todoListService.    
      onUpdate.subscribe((task: Task) => {    
        this.onUpdateTask(task);    
      }); 
      
      this.todoListService.subsVar = this.todoListService.    
      onDelete.subscribe((task: Task) => {    
        this.onDeleteTask(task);    
      }); 
    }      
  }

  onCreateNewTask(task: Task) {
    this.taskList.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
  }

  onUpdateTask(task: Task) {
    const index = this.taskList.findIndex(t => t.id == task.id);
    this.taskList[index] = task;
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
  }

  onDeleteTask(task: Task) {
    const index = this.taskList.findIndex(t => t.id == task.id);
    this.taskList.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
  }

  onDeleteMultiplesTask(tasks: Task[]) {
    tasks.map(t => {
      const index = this.taskList.findIndex(item => item.id == t.id);
      this.taskList.splice(index, 1);
    })
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
  }
}
