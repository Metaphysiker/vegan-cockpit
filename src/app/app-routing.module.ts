import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgeBracketComponent } from './age-bracket/age-bracket.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CategoryAnalyticsComponent } from './category-analytics/category-analytics.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'category-analytics', component: CategoryAnalyticsComponent },
  { path: 'age-bracket', component: AgeBracketComponent },
  { path: '', component: WelcomeComponent },
  { path: '**', component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
