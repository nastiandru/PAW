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
  private taskIdCounter: number = 5;
  features: Feature[] = [];
  selectedFeatureId: string = '0';
  newTaskName: string = '';
  newTaskDescription: string = '';
  tasks: Task[] = [];
  isTaskListVisible: boolean = true;

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
    this.updateFeatureStatus();
  }

  addTask(): void {
    const newTask: Task = {
      id: this.taskIdCounter,
      name: this.newTaskName,
      description: this.newTaskDescription,
      status: 'todo',
      featureId: parseInt(this.selectedFeatureId)
    };

    this.taskIdCounter++;

    this.tasksService.addTask(newTask).subscribe(
      () => {
        this.loadTasks();
        this.newTaskName = '';
        this.newTaskDescription = '';
      },
      (error) => {
        console.log('Error adding task:', error);
      }
    );
  }

  editTask(task: Task): void {
    task.editMode = true;
  }

  saveTask(task: Task): void {
    if (task.name && task.name.trim() !== '') {
      task.editMode = false;

      this.tasksService.editTask(task.id, task.name, task.status, task.description).subscribe(
        () => {
          this.loadTasks();
          if (task.status === 'doing') {
            this.updateFeatureStatus(); // Aktualizuj status funkcjonalności po zmianie statusu zadania na "doing"
          }
        },
        (error) => {
          console.log('Error editing task:', error);
        }
      );
    }
  }

  deleteTask(taskId: number): void {
    this.tasksService.deleteTask(taskId);
    this.updateFeatureStatus();
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

  updateFeatureStatus(): void {
    this.features.forEach((feature) => {
      const tasks = this.tasksService.getTasksForFeature(feature.id);
      const allTasksDone = tasks.every((task) => task.status === 'done');
      if (allTasksDone) {
        feature.status = 'done';
      } else if (tasks.some((task) => task.status === 'doing')) {
        feature.status = 'doing';
      } else {
        feature.status = 'todo';
      }
      this.featuresService.editFeature(feature.id, feature.name, feature.status).subscribe(
        () => {},
        (error) => {
          console.log('Error updating feature status:', error);
        }
      );
    });
  }

  toggleTaskList(): void {
    this.isTaskListVisible = !this.isTaskListVisible;
  }
}