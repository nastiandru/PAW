import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Task } from '../features/feature.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
    
  private tasks: Task[] = [
    {
      id: 1,
      name: 'Zadanie 1',
      status: 'todo',
      featureId: 1
    },
    {
      id: 2,
      name: 'Zadanie 2',
      status: 'in progress',
      featureId: 1
    },
    {
      id: 3,
      name: 'Zadanie 3',
      status: 'done',
      featureId: 2
    },
    {
      id: 4,
      name: 'Zadanie 4',
      status: 'todo',
      featureId: 2
    }
  ];

  tasksChanged: Subject<void> = new Subject<void>(); // Subject do powiadamiania o zmianach w zadaniach

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

  notifyTasksChanged(): void {
    this.tasksChanged.next(); // Wywołanie metody next() powoduje wysłanie powiadomienia do subskrybentów
  }
}