import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../features/feature.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
    
  private tasks: Task[] = [];

  getTasksForFeature(featureId: number): Observable<Task[]> {
    const tasksForFeature = this.tasks.filter(task => task.featureId === featureId);
    return of(tasksForFeature);
  }

  getAllTasks(): Observable<Task[]> {
    return of(this.tasks);
  }
  

  addTask(task: Task): Observable<void> {
    this.tasks.push(task);
    return of();
  }

  deleteTask(taskId: number): Observable<void> {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
    return of();
  }
}