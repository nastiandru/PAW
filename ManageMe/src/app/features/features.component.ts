import { Component, OnInit } from '@angular/core';
import { Feature } from './feature.model';
import { FeaturesService } from '../services/features.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  features: Feature[] = [];
  newFeatureName: string = '';

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

  addFeature(): void {
    const newFeature: Feature = {
      id: Date.now(),
      name: this.newFeatureName,
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
}