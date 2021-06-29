import { EventEmitter, Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { Task } from "src/model/type";

@Injectable({    
    providedIn: 'root'    
})
export class TodoListService {
    public onUpdate = new EventEmitter<any>();    
    public onDelete = new EventEmitter<any>();    
    subsVar?: Subscription;   

    constructor() { }    
    
    onUpdateTask(task: Task) {    
        this.onUpdate.emit(task);    
    }   
    
    onDeleteTask(task: Task) {    
        this.onDelete.emit(task);    
    } 
}
