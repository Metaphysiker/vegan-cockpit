import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CategoryAnalyticsComponent } from './category-analytics/category-analytics.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';

import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MAT_DATE_LOCALE } from '@angular/material/core'
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { WordpressCategoriesComponent } from './wordpress-categories/wordpress-categories.component';
import { WordpressBlogPostComponent } from './wordpress-blog-post/wordpress-blog-post.component';
import { WordpressBlogPostsComponent } from './wordpress-blog-posts/wordpress-blog-posts.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { AgeBracketComponent } from './age-bracket/age-bracket.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoryAnalyticsAgeComponent } from './category-analytics-age/category-analytics-age.component';
import { WordpressBlogPostsAgeComponent } from './wordpress-blog-posts-age/wordpress-blog-posts-age.component';
import { TableComponent } from './table/table.component';
import { PayrexxComponent } from './payrexx/payrexx.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CategoryAnalyticsComponent,
    WordpressCategoriesComponent,
    WordpressBlogPostComponent,
    WordpressBlogPostsComponent,
    PieChartComponent,
    AgeBracketComponent,
    NavbarComponent,
    CategoryAnalyticsAgeComponent,
    WordpressBlogPostsAgeComponent,
    TableComponent,
    PayrexxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
