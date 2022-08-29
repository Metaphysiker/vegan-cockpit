import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgeBracketComponent } from './age-bracket/age-bracket.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PayrexxComponent } from './payrexx/payrexx.component';
import { CategoryAnalyticsComponent } from './category-analytics/category-analytics.component';
import { CategoryAnalyticsAgeComponent } from './category-analytics-age/category-analytics-age.component';
import { CategoryAnalyticsGenderComponent } from './category-analytics-gender/category-analytics-gender.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'category-analytics', component: CategoryAnalyticsComponent },
  { path: 'category-analytics-age', component: CategoryAnalyticsAgeComponent },
  { path: 'category-analytics-gender', component: CategoryAnalyticsGenderComponent },
  { path: 'age-bracket', component: AgeBracketComponent },
  { path: 'payrexx', component: PayrexxComponent },
  { path: '', component: WelcomeComponent },
  { path: '**', component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
