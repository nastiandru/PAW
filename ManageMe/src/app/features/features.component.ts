import { Component, OnInit } from '@angular/core';
import { Feature, Task } from '../features/feature.model';
import { FeaturesService } from '../services/features.service';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  private featureIdCounter: number = 3;
  features: Feature[] = [];
  newFeatureName: string = '';

  constructor(private featuresService: FeaturesService, private tasksService: TasksService) {}

  ngOnInit(): void {
    this.loadFeatures();
  }

  loadFeatures(): void {
    this.featuresService.getFeatures().subscribe(
      (features: Feature[]) => {
        this.features = features.map((feature) => {
          return { ...feature, newName: feature.name, editMode: false };
        });
      },
      (error) => {
        console.log('Error retrieving features:', error);
      }
    );
  }

  addFeature(): void {
    const newFeature: Feature = {
      id: this.featureIdCounter,
      name: this.newFeatureName,
      status: 'todo',
      newName: this.newFeatureName,
      tasks: []
    };

    this.featureIdCounter++;

    this.featuresService.addFeature(newFeature).subscribe(
      () => {
        this.loadFeatures();
        this.newFeatureName = '';
      },
      (error) => {
        console.log('Error adding feature:', error);
      }
    );
  }

  editFeature(feature: Feature): void {
    feature.editMode = true;
  }

  saveFeature(feature: Feature): void {
    if (feature.newName && feature.newName.trim() !== '') {
      feature.name = feature.newName;
      feature.editMode = false;

      this.featuresService.editFeature(feature.id, feature.name, feature.status).subscribe(
        () => {
          this.loadFeatures();
        },
        (error) => {
          console.log('Error editing feature:', error);
        }
      );
    }
  }

  deleteFeature(featureId: number): void {
    this.featuresService.deleteFeature(featureId).subscribe(
      () => {
        this.loadFeatures();
      },
      (error) => {
        console.log('Error deleting feature:', error);
      }
    );
  }

  getTasksForFeature(featureId: number): Task[] {
    return this.tasksService.getTasksForFeature(featureId);
  }

  updateFeatureStatus(featureId: number): void {
    console.log(this.features);  // Wypisanie wartości this.features
    console.log(this.tasksService);  // Wypisanie wartości this.tasksService
    const feature = this.features.find((f) => f.id === featureId);
    if (feature) {
      const tasks = this.tasksService.getTasksForFeature(featureId);
      const allTasksDone = tasks.every((task) => task.status === 'done');
      if (allTasksDone) {
        feature.status = 'done';
      } else if (tasks.some((task) => task.status === 'doing')) {
        feature.status = 'doing';
      } else {
        feature.status = 'todo';
      }
      this.featuresService.editFeature(feature.id, feature.name, feature.status).subscribe(
        () => {
          this.loadFeatures();
        },
        (error) => {
          console.log('Error updating feature status:', error);
        }
      );
    }
  }
}