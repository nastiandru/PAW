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
  features: Feature[] = [];
  newFeatureName: string = '';

  constructor(private featuresService: FeaturesService, private tasksService: TasksService) { }

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
      id: Date.now(),
      name: this.newFeatureName,
      newName: this.newFeatureName,
      tasks: []
    };

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
  
      this.featuresService.editFeature(feature.id, feature.name).subscribe(
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
}