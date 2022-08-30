import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GoogleAnalyticsService } from '../google-analytics.service';
import { WordpressService } from '../wordpress.service';

import { Analysis } from '../analysis';
import { WordpressBlogPost } from '../wordpress-blog-post';

@Component({
  selector: 'app-wordpress-blog-posts',
  templateUrl: './wordpress-blog-posts.component.html',
  styleUrls: ['./wordpress-blog-posts.component.scss']
})
export class WordpressBlogPostsComponent implements OnInit {

  wordpressBlogPosts: WordpressBlogPost[] = [];
  wordpressBlogPostsHeaders: string[] = ["title", "url", "users", "sessions", "pageviews"];

  @Input() blog_posts: any = [];

  @Output() analysisCompleteEvent = new EventEmitter<Analysis>();

  @Input() category: any = {id: 0, name: "Default"};

  @Input() start_date: string = "Missing";
  @Input() end_date: string = "Missing";
  @Input() data_google_view_id: string = "Missing";

  constructor(
    private googleAnalyticsService: GoogleAnalyticsService,
    private wordpressService: WordpressService) { }

  ngOnInit(): void {

    this.getAllBlogPosts()
      .then(() => this.iterateOverBlogPostsAndGetGoogleData())
      .then(() => {
        console.log("iterate fini fini fini finished");
        this.analysisComplete();
      });

  }

  ngOnChanges():void {

    //console.log("CHANGE IS HAPPENING!");

    //this.iterateOverBlogPostsAndGetGoogleData().then((response: any) => console.log("finished"));

  }

  analysisComplete() {
    this.analysisCompleteEvent.emit(this.getTotals())
  }

  getTotals(): Analysis {

    var analysis: Analysis = {
      category_id: this.category["id"],
      category_name: this.category["name"],
      users: 0,
      sessions: 0,
      pageviews: 0
    }

    for (let i = 0; i < this.wordpressBlogPosts.length; i++) {
      analysis["users"] += parseInt(this.wordpressBlogPosts[i]["users"] as any);
      analysis["sessions"] += parseInt(this.wordpressBlogPosts[i]["sessions"] as any);
      analysis["pageviews"] += parseInt(this.wordpressBlogPosts[i]["pageviews"] as any);
    }

    console.log("HERE IS ANALYSIS");
    console.log(analysis);
    return analysis;
  }

  getAllBlogPosts(): any {
    var self = this;
    var per_page = 100;
    var page = 1;
    return new Promise(function(final_resolve, final_reject){

      for (let page_index = 1, p = Promise.resolve(); (page_index - 1) * per_page < self.category["count"]; page_index++)
        {

          p = p.then(() => new Promise(function(loop_resolve, loop_reject) {
            console.log("page_index: " + page_index);

            self.wordpressService.getPostsWithCategories(self.category["id"], per_page, page_index)
            .subscribe((response: any) => {
              //self.blog_posts = [...current_blog_posts, response];
              console.log("blog_posts length");
              console.log(self.blog_posts.length);
              console.log("response length");
              console.log(response.length);
              //self.blog_posts = self.blog_posts + response;

              var existing_blog_posts = self.blog_posts;
              self.blog_posts = [...existing_blog_posts, ...response];

              for (let i = 0; i < response.length; i++) {
                self.wordpressBlogPosts.push({
                  title: response[i]["title"]["rendered"],
                  url: response[i]["slug"],
                  users: 0,
                  sessions: 0,
                  pageviews: 0,
                })
              }



              console.log(self.blog_posts.constructor.name)


              loop_resolve();

              if(page_index * per_page > self.category["count"]) {
                final_resolve("finished");
              }
            });



          }))

        }

    })
  }

  iterateOverBlogPostsAndGetGoogleData():any {
    console.log("ITERATING");

    var self = this;

    return new Promise(function(final_resolve, final_reject){

      for (let i = 0, p = Promise.resolve(); i < self.wordpressBlogPosts.length; i++)
        {

          p = p.then(() => new Promise(function(second_resolve, second_reject) {

            self.getGoogleDataAndUpdate(self.wordpressBlogPosts[i]["url"]).then((result: any) => {

              console.log("getGoogleDataAndUpdate");
              console.log(result);

              var users = 0;
              var sessions = 0;
              var pageviews = 0;

              if(!isNaN(result["users"])) {
                users += parseInt(result["users"], 10)
              }

              if(!isNaN(result["sessions"])) {
                sessions += parseInt(result["sessions"], 10)
              }

              if(!isNaN(result["pageviews"])) {
                pageviews += parseInt(result["pageviews"], 10)
              }

              self.blog_posts[i]["users"] = users;
              self.blog_posts[i]["sessions"] = sessions;
              self.blog_posts[i]["pageviews"] = pageviews;

              self.wordpressBlogPosts[i]["users"] = users;
              self.wordpressBlogPosts[i]["sessions"] = sessions;
              self.wordpressBlogPosts[i]["pageviews"] = pageviews;

              //self.blog_posts = self.blog_posts.sort((a: any, b: any) => b.users - a.users);

              second_resolve();

              if((i + 1) >= self.blog_posts.length) {
                  final_resolve("finished");
                }

            });

          }))

        }

    })
  }

  getGoogleDataAndUpdate(relative_url: string):any {
    var self = this;
    //console.log(relative_url);

    return new Promise(function(resolve, reject)
    {

      self.googleAnalyticsService.getDataFromGoogle(
        self.data_google_view_id,
          {
            startDate: self.start_date,
            endDate: self.end_date
          },
        relative_url).then(
        function(response: any) {
          //let data_rows = {users: 0, sessions: 0, pageviews: 0}

          let data_rows = {
            users: response?.result?.reports?.[0].data?.rows?.[0]?.metrics[0]?.values[0],
            sessions: response?.result?.reports?.[0].data?.rows?.[0]?.metrics[0]?.values[1],
            pageviews: response?.result?.reports?.[0].data?.rows?.[0]?.metrics[0]?.values[2]
          }

          resolve(data_rows);
        })
        });


  }

}
