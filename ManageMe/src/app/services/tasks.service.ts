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
      description: 'Opis zadania',
      status: 'todo',
      featureId: 1
    },
    {
      id: 2,
      name: 'Zadanie 2',
      description: 'Opis zadania1',
      status: 'doing',
      featureId: 1
    },
    {
      id: 3,
      name: 'Zadanie 3',
      description: 'Opis zadania',
      status: 'done',
      featureId: 2
    },
    {
      id: 4,
      name: 'Zadanie 4',
      description: 'Opis zadania',
      status: 'todo',
      featureId: 2
    }
  ];
  

  tasksChanged: Subject<void> = new Subject<void>(); // Subject do powiadamiania o zmianach w zadaniach

  getTasksForFeature(featureId: number): Task[] {
    return this.tasks.filter(task => task.featureId === featureId);
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): Observable<void> {
    this.tasks.push(task);
    this.notifyTasksChanged(); // powiadomienie o zmianie zadań
    return of(undefined); // zwróć pustą wartość observable
  }

  editTask(taskId: number, newName: string, newStatus: string, newTaskDescription: string): Observable<void> {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.name = newName;
      task.description = newTaskDescription;
      task.status = newStatus;
    }
    this.notifyTasksChanged();
    return of(undefined);
  }

  deleteTask(taskId: number): void {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.notifyTasksChanged();
    }
  }

  notifyTasksChanged(): void {
    this.tasksChanged.next(); // Wywołanie metody next() powoduje wysłanie powiadomienia do subskrybentów
  }

  
}