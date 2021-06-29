import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Task } from 'src/model/type';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit, OnChanges {

  @Input("isShowDetail") isShowDetail: boolean = false;
  @Input("buttonTitle") buttonTitle: string = 'Add';
  @Input("bgColor") bgColor: string = 'none';
  @Input("selectedTask") selectedTask?: Task;
  @Input("taskList") taskList: any[] = [];

  @Output() onCreate: EventEmitter<any> = new EventEmitter();
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onCloseDetailScreen: EventEmitter<any> = new EventEmitter();


 
  taskName = new FormControl('', [Validators.required]);
  description = new FormControl('');  
  dueDate = new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en'), [this.dueDateValidator]);
  piority = new FormControl('Normal');

  isInValidTaskName: boolean = false;
  isInValidDueDate: boolean = false;

  constructor() {}

  ngOnChanges(): void {
    if(this.selectedTask) {
      this.taskName.setValue(this.selectedTask.name);
      this.description.setValue(this.selectedTask.description);
      this.dueDate.setValue(formatDate(this.selectedTask.dueDate ? this.selectedTask.dueDate : new Date(), 'yyyy-MM-dd', 'en'));
      this.piority.setValue(this.selectedTask.piority);
    } else {
      this.reset();
    }
  }

  dueDateValidator(control: AbstractControl): {[key: string]: boolean} | null  {
    if (new Date(control.value).getTime() < new Date().getTime()) {
      return { dueDateInValid: true };
    }
    return null;
  }

  onValidate() {
    if(this.taskName.valid && !this.dueDate.errors) {
      this.isInValidTaskName = false;
      this.isInValidDueDate = false;
      return true;
    } else {
      this.isInValidTaskName = this.taskName.valid ? false : true;
      this.isInValidDueDate = this.dueDate.errors && this.dueDate.errors['dueDateInValid'] ? true : false;
      return false;
    }
  }

  ngOnInit(): void {
    
  }

  onCreateNewTask() {
    if(this.onValidate()) {
      const newTask: Task = {
        id: this.taskList.length,
        name: this.taskName.value,
        description: this.description.value,
        dueDate: new Date(this.dueDate.value),
        piority: this.piority.value
      }
      this.onCreate.emit(newTask);
      this.reset();
    }
  }

  onUpdateTask() {
    const updatedTask: Task = {
      id: this.selectedTask?.id,
      name: this.taskName.value,
      description: this.description.value,
      dueDate: new Date(this.dueDate.value),
      piority: this.piority.value
    }
    this.onUpdate.emit(updatedTask);
  }

  reset() {
    this.taskName.setValue('');
    this.dueDate.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    this.description.setValue('');
    this.piority.setValue('Normal');
  }

  onClose() {
    this.onCloseDetailScreen.emit(false);
  }
}
