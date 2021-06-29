import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/model/type';
import { TodoListService } from 'src/service/todo-list.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input('task') task: Task = new Task();

  @Output() onChecked: EventEmitter<any> = new EventEmitter();
  @Output() onUnChecked: EventEmitter<any> = new EventEmitter();

  isShowDetail: boolean = false;

  checkedTask: Task[] = [];

  constructor(private todoListService: TodoListService) { }

  ngOnInit(): void {
  }

  onOpenDetailScreen() {
    this.isShowDetail = true;
  }

  onUpdateSelectedTask(task: Task) {
    this.todoListService.onUpdateTask(task);
  }

  onDeleteSelectedTask(task: Task) {
    console.log(task);
    this.todoListService.onDeleteTask(task);
  }

  onChecking(event: any, task: Task) {
    if (event.target.checked) {
      this.onChecked.emit(task);
    } else {
      this.onUnChecked.emit(task);
    }
  }

  onClose(value: boolean) {
    this.isShowDetail = value;
  }
}
