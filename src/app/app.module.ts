import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import { BarComponent } from './bar/bar.component';
import { OffersComponent } from './offers/offers.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RoomFormComponent } from './room-form/room-form.component';
import { RoomService } from './services/room.service';
import { RoomTableComponent } from './room-table/room-table.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    RoomTableComponent,
    RoomFormComponent,
    BarComponent,
    OffersComponent,
    RecommendationsComponent,
    AboutUsComponent,
  ],
  imports: [HttpClientModule, BrowserModule, ReactiveFormsModule, AppRoutingModule],
  providers: [RoomService],
  bootstrap: [AppComponent],
})
export class AppModule { }
