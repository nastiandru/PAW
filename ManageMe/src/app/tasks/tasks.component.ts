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
  features: Feature[] = [];
  tasks: Task[] = [];
  selectedFeatureId: string = '0';
  newTaskName: string = '';

  constructor(private featuresService: FeaturesService, private tasksService: TasksService) {}

  ngOnInit(): void {
    this.loadFeatures();
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
      this.tasksService.getAllTasks().subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
        },
        (error) => {
          console.log('Error retrieving tasks:', error);
        }
      );
    } else {
      const featureId = parseInt(this.selectedFeatureId);
      this.tasksService.getTasksForFeature(featureId).subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
        },
        (error) => {
          console.log('Error retrieving tasks:', error);
        }
      );
    }
  }

  addTask(): void {
    const newTask: Task = {
      id: Date.now(),
      name: this.newTaskName,
      status: 'todo',
      featureId: parseInt(this.selectedFeatureId)
    };

    this.tasksService.addTask(newTask).subscribe(
      () => {
        this.loadTasks();
        this.newTaskName = '';
      },
      (error) => {
        console.log('Error adding task:', error);
      }
    );
  }

  deleteTask(taskId: number): void {
    this.tasksService.deleteTask(taskId).subscribe(
      () => {
        this.loadTasks();
      },
      (error) => {
        console.log('Error deleting task:', error);
      }
    );
  }

  getFeatureName(featureId: number): string {
    const feature = this.features.find((f) => f.id === featureId);
    return feature ? feature.name : '';
  }
}