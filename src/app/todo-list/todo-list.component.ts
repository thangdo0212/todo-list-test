import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Task } from 'src/model/type';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input("taskList") taskList: any[] = [];

  @Output() onRemoveMultiplesTask: EventEmitter<any> = new EventEmitter();

  checkedTask: Task[] = [];

  constructor() {}

  ngOnInit(): void {
    this.taskList.sort(function(a, b){return new Date(a['dueDate']).getTime() - new Date(b['dueDate']).getTime()});
    console.log(this.taskList);
  }

  onCheck(task: Task) {
    this.checkedTask.push(task);
  }

  onUnCheck(task: Task) {
    const index = this.checkedTask.findIndex(t => t.id == task.id);
    this.checkedTask.splice(index, 1);
  }

  onRemoveMutiples() {
    this.onRemoveMultiplesTask.emit(this.checkedTask);
  }
}
