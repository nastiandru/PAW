import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Feature } from '../features/feature.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {
  private features: Feature[] = [
    {
      id: 1,
      name: 'Funkcjonalność 1',
      status: 'todo',
      tasks: []
    },
    {
      id: 2,
      name: 'Funkcjonalność 2',
      status: 'doing',
      tasks: []
    },
  
  ];

  private featureIdCounter: number = 3;

  featuresChanged: Subject<void> = new Subject<void>();

  getFeatures(): Observable<Feature[]> {
    return of(this.features);
  }

  addFeature(feature: Feature): Observable<Feature> {
    const newFeature: Feature = {
      id: this.featureIdCounter,
      name: feature.name,
      status: feature.status || 'todo',
      tasks: []
    };
    this.featureIdCounter++; // Inkrementacja licznika

    this.features.push(newFeature);
    this.featuresChanged.next();
    return of(newFeature);
  }

  editFeature(featureId: number, newName: string, newStatus: string): Observable<Feature | undefined> {
    return this.getFeatureById(featureId).pipe(
      map((feature: Feature | undefined) => {
        if (feature) {
          feature.name = newName;
          feature.status = newStatus;
        }
        return feature;
      })
    );
  }

  private getFeatureById(featureId: number): Observable<Feature | undefined> {
    return of(this.features.find((feature) => feature.id === featureId));
  }

  deleteFeature(featureId: number): Observable<void> {
    const index = this.features.findIndex((f) => f.id === featureId);
    if (index !== -1) {
      this.features.splice(index, 1);
    }
    return of();
  }


  updateFeatureStatus(featureId: number, newStatus: string): Observable<void> {
    const feature = this.features.find((f) => f.id === featureId);
    if (feature) {
      feature.status = newStatus;
      this.featuresChanged.next();
    }
    return of();
  }
}