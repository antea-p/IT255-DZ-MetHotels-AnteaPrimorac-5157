import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import { BarComponent } from './bar/bar.component';
import { OffersComponent } from './offers/offers.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RoomFormComponent } from './room-form/room-form.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    RoomFormComponent,
    BarComponent,
    OffersComponent,
    RecommendationsComponent,
    AboutUsComponent,
    RoomFormComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
