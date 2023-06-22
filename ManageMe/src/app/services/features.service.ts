import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Feature, Task } from '../features/feature.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {
  private features: Feature[] = [
    {
      id: 1,
      name: 'Funkcjonalność 1',
      tasks: []
    },
    {
      id: 2,
      name: 'Funkcjonalność 2',
      tasks: []
    }
  ];

  getFeatures(): Observable<Feature[]> {
    return of(this.features);
  }

  addFeature(feature: Feature): Observable<Feature> {
    const newFeature: Feature = {
      id: Date.now(),
      name: feature.name,
      tasks: []
    };
    this.features.push(newFeature);
    return of(newFeature);
  }

  editFeature(featureId: number, newName: string): Observable<Feature | undefined> {
    return this.getFeatureById(featureId).pipe(
      map((feature: Feature | undefined) => {
        if (feature) {
          feature.name = newName;
        }
        return feature;
      })
    );
  }
  
  private getFeatureById(featureId: number): Observable<Feature | undefined> {
    return of(this.features.find(feature => feature.id === featureId));
  }

  deleteFeature(featureId: number): Observable<void> {
    const index = this.features.findIndex(f => f.id === featureId);
    if (index !== -1) {
      this.features.splice(index, 1);
    }
    return of();
  }


}