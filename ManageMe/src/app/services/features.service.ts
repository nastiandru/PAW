import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Feature, Task } from '../features/feature.model';

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

  addFeature(feature: Feature): Observable<void> {
    this.features.push(feature);
    return of();
  }

  deleteFeature(featureId: number): Observable<void> {
    const index = this.features.findIndex(f => f.id === featureId);
    if (index !== -1) {
      this.features.splice(index, 1);
    }
    return of();
  }


}