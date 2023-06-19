import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Feature } from '../features/feature.model';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {
  private features: Feature[] = [
    {
      id: 1,
      name: 'Funkcjonalność 1',
      tasks: [
        { id: 1, name: 'Zadanie 1', status: 'todo', featureId: 1 },
        { id: 2, name: 'Zadanie 2', status: 'doing', featureId: 1 }
      ]
    },
    {
      id: 2,
      name: 'Funkcjonalność 2',
      tasks: [
        { id: 3, name: 'Zadanie 3', status: 'done', featureId: 2 },
        { id: 4, name: 'Zadanie 4', status: 'todo', featureId: 2 }
      ]
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