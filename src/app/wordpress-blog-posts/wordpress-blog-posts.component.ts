import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GoogleAnalyticsService } from '../google-analytics.service';
import { WordpressService } from '../wordpress.service';

import { Analysis } from '../analysis';

@Component({
  selector: 'app-wordpress-blog-posts',
  templateUrl: './wordpress-blog-posts.component.html',
  styleUrls: ['./wordpress-blog-posts.component.scss']
})
export class WordpressBlogPostsComponent implements OnInit {

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
      users: 0,
      sessions: 0,
      pageviews: 0
    }

    for (let i = 0; i < this.blog_posts.length; i++) {

      var users = parseInt(this.blog_posts[i]["users"], 10);
      console.log(users);
      if(!isNaN(users)){
        analysis["users"] = analysis["users"] + users;
      }

      var sessions = parseInt(this.blog_posts[i]["sessions"], 10);
      if(!isNaN(sessions)){
        analysis["sessions"] = analysis["sessions"] + sessions;
      }

      var pageviews = parseInt(this.blog_posts[i]["pageviews"], 10);
      if(!isNaN(pageviews)){
        analysis["pageviews"] = analysis["pageviews"] + pageviews;
      }

      //analysis["sessions"] = analysis["sessions"] + this.blog_posts[i]["sessions"];
      //analysis["pageviews"] = analysis["pageviews"] + this.blog_posts[i]["pageviews"];
    }

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

      for (let i = 0, p = Promise.resolve(); i < self.blog_posts.length; i++)
        {

          p = p.then(() => new Promise(function(second_resolve, second_reject) {

            self.getGoogleDataAndUpdate(self.blog_posts[i]["slug"]).then((result: any) => {

              self.blog_posts[i]["users"] = result["users"];
              self.blog_posts[i]["sessions"] = result["sessions"];
              self.blog_posts[i]["pageviews"] = result["pageviews"];

              self.blog_posts = self.blog_posts.sort((a: any, b: any) => b.users - a.users);

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
