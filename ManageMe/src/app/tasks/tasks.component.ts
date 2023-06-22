import { Component, OnInit } from '@angular/core';
import { Feature, Task } from '../features/feature.model';
import { FeaturesService } from '../services/features.service';
import { TasksService } from '../services/tasks.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  private taskIdCounter: number = 1;
  features: Feature[] = [];
  selectedFeatureId: string = '0';
  newTaskName: string = '';
  tasks: Task[] = [];

  constructor(private featuresService: FeaturesService, private tasksService: TasksService) {}

  ngOnInit(): void {
    this.loadFeatures();
    this.loadTasks();
    this.tasksService.tasksChanged.subscribe(() => {
      this.loadTasks();
    });
  }

  loadFeatures(): void {
    this.featuresService.getFeatures().subscribe(
      (features: Feature[]) => {
        this.features = features;
      },
      (error) => {
        console.log('Error retrieving features:', error);
      }
    );
  }

  loadTasks(): void {
    if (this.selectedFeatureId === '0') {
      this.tasks = this.tasksService.getAllTasks();
    } else {
      const featureId = parseInt(this.selectedFeatureId);
      this.tasks = this.tasksService.getTasksForFeature(featureId);
    }
  }

  addTask(): void {
    const newTask: Task = {
      id: this.taskIdCounter,
      name: this.newTaskName,
      status: 'todo',
      featureId: parseInt(this.selectedFeatureId)
    };

    // Inkrementacja licznika identyfikatorów
    this.taskIdCounter++;

    this.tasksService.addTask(newTask).subscribe(
      () => {
        this.loadTasks();
        this.newTaskName = '';
      },
      (error) => {
        console.log('Błąd podczas dodawania zadania:', error);
      }
    );
  }

  deleteTask(taskId: number): void {
    this.tasksService.deleteTask(taskId);
  }

  getTasksForFeature(featureId: string): Task[] {
    if (featureId === '0') {
      return this.tasksService.getAllTasks();
    } else {
      const id = parseInt(featureId);
      return this.tasksService.getTasksForFeature(id);
    }
  }

  getFeatureName(featureId: number): string {
    const feature = this.features.find((f) => f.id === featureId);
    return feature ? feature.name : '';
  }
}