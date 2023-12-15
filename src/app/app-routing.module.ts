import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffersComponent } from './offers/offers.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { AdminCRUDComponent } from './admin-crud/admin-crud.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    title: 'About Us',
  },
  {
    path: 'offers',
    component: OffersComponent,
    title: 'Contact Us',
  },
  {
    path: 'recommendations',
    component: RecommendationsComponent,
    title: 'Recommendations',
  },
  {
    path: 'admin',
    component: AdminCRUDComponent,
    title: 'Admin CRUD',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
