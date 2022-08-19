import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  constructor(private http: HttpClient) { }


  getCategories(): any {
    var url = 'https://vegan.ch/wp-json/wp/v2/categories';

    return this.http.get<any>(url);

  }

  getPostsWithCategories(category_id: number, per_page: number = 100, page: number = 1): any {
    var url = 'https://vegan.ch/wp-json/wp/v2/posts?categories=' + category_id + "&per_page=" + per_page + "&page=" + page;

    return this.http.get<any>(url);

  }

}
