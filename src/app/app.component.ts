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
  public filteredList: any[] = [];
  searchValue: string = '';

  constructor(private todoListService: TodoListService) {
    const item = localStorage.getItem('tasks');
    this.taskList = item ? JSON.parse(item) : [];
    this.sortList();
    this.filteredList = this.taskList;
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
    this.sortList();
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
  }

  onUpdateTask(task: Task) {
    const index = this.taskList.findIndex(t => t.id == task.id);
    this.taskList[index] = task;
    this.sortList();
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
  }

  onDeleteTask(task: Task) {
    const index = this.taskList.findIndex(t => t.id == task.id);
    this.taskList.splice(index, 1);
    this.sortList();
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
    this.filteredList = this.taskList.filter(t => t.name.includes(this.searchValue));
  }

  onDeleteMultiplesTask(tasks: Task[]) {
    console.log('tasks', tasks);
    tasks.forEach(t => {
      const index = this.taskList.findIndex(item => item.id == t.id);
      this.taskList.splice(index, 1);
    })
    this.sortList();
    this.filteredList = this.taskList.filter(t => t.name.includes(this.searchValue));
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
  }

  onFilter(value: string) {
    if (value !== '') {
      this.searchValue = value;
      this.filteredList = this.taskList.filter(t => t.name.includes(value));
    } else {
      this.filteredList = this.taskList;
      this.searchValue = '';
    }
  }

  sortList() {
    this.taskList.sort(function (a, b) { return new Date(a['dueDate']).getTime() - new Date(b['dueDate']).getTime() });
  }
}
