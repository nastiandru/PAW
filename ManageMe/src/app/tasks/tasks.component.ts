import { Component, OnInit } from '@angular/core';
import { Feature, Task } from '../features/feature.model';
import { FeaturesService } from '../services/features.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  features: Feature[] = [];
  tasks: Task[] = [];
  selectedFeatureId: number = 0;

  constructor(private featuresService: FeaturesService) { }

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

  loadTasks(event: any): void {
    const featureId = event.target.value;
    this.selectedFeatureId = featureId;
    this.tasks = this.features.find(f => f.id === featureId)?.tasks || [];
  }
}