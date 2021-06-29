import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Task } from 'src/model/type';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input("taskList") taskList: any[] = [];
  @Input("filteredList") filteredList: any[] = [];


  @Output() onRemoveMultiplesTask: EventEmitter<any> = new EventEmitter();
  @Output() onFilter: EventEmitter<any> = new EventEmitter();

  checkedTask: Task[] = [];
  searchValue: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onCheck(task: Task) {
    console.log(task);
    this.checkedTask.push(task);
  }

  onUnCheck(task: Task) {
    const index = this.checkedTask.findIndex(t => t.id == task.id);
    this.checkedTask.splice(index, 1);
  }

  onRemoveMutiples() {
    this.onRemoveMultiplesTask.emit(this.checkedTask);
  }

  onSearch() {
    this.onFilter.emit(this.searchValue);
  }
}
