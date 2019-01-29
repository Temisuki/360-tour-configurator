import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TourComponent } from './visualization/tour/tour.component';
import { RoomListComponent } from './visualization/room-list/room-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TourComponent,
    RoomListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
