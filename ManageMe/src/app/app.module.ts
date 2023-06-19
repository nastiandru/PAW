import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FeaturesComponent } from './features/features.component';
import { TasksComponent } from './tasks/tasks.component';
import { FeaturesService } from './services/features.service';

@NgModule({
  declarations: [
    AppComponent,
    FeaturesComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [FeaturesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
