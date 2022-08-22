import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GoogleAnalyticsService } from '../google-analytics.service';
import { WordpressService } from '../wordpress.service';

import { AgeAnalysis } from '../age-analysis';

@Component({
  selector: 'app-wordpress-blog-posts-age',
  templateUrl: './wordpress-blog-posts-age.component.html',
  styleUrls: ['./wordpress-blog-posts-age.component.scss']
})
export class WordpressBlogPostsAgeComponent implements OnInit {

  @Input() blog_posts: any = [];

  @Output() analysisCompleteEvent = new EventEmitter<AgeAnalysis>();

  @Input() category: any = {id: 0, name: "Default"};

  @Input() start_date: string = "Missing";
  @Input() end_date: string = "Missing";
  @Input() data_google_view_id: string = "Missing";

  constructor(
    private googleAnalyticsService: GoogleAnalyticsService,
    private wordpressService: WordpressService
  ) { }

  ngOnInit(): void {

    this.getAllBlogPosts()
      .then(() => this.iterateOverBlogPostsAndGetGoogleData())
      .then(() => {
        console.log("iterate fini fini fini finished");
        this.analysisComplete();
      });

  }

  analysisComplete() {
    this.analysisCompleteEvent.emit(this.getTotals())
  }

  getTotals(): AgeAnalysis {

    var analysis: AgeAnalysis = {
      category_id: this.category["id"],
      category_name: this.category["name"],
      "18-24": 0,
      "25-34": 0,
      "35-44": 0,
      "45-54": 0,
      "55-64": 0,
      "65": 0,
    }

    for (let i = 0; i < this.blog_posts.length; i++) {



      analysis["18-24"] += parseInt(this.blog_posts[i]["18-24"], 10);
      analysis["25-34"] += parseInt(this.blog_posts[i]["25-34"], 10);
      analysis["35-44"] += parseInt(this.blog_posts[i]["35-44"], 10);
      analysis["45-54"] += parseInt(this.blog_posts[i]["45-54"], 10);
      analysis["55-64"] += parseInt(this.blog_posts[i]["55-64"], 10);
      analysis["65"] += parseInt(this.blog_posts[i]["65+"], 10);

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
              //self.blog_posts[i] = result;

              self.blog_posts[i] = {
                                        ...self.blog_posts[i],
                                        ...result
                                    }

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

      self.googleAnalyticsService.getDataFromGoogleWithUserAgeBracketDimension(
        self.data_google_view_id,
          {
            startDate: self.start_date,
            endDate: self.end_date
          },
        relative_url).then(
        function(response: any) {
          //let data_rows = {users: 0, sessions: 0, pageviews: 0}

          var rows = response?.result?.reports?.[0].data?.rows;

          var data_rows: any = {
            "18-24": 0,
            "25-34": 0,
            "35-44": 0,
            "45-54": 0,
            "55-64": 0,
            "65+": 0
          };

          if(typeof rows !== "undefined") {
            for (let i = 0; i < rows.length; i++) {
              // get name of dimension, e.g. 18-24
              var dimension = rows[i]["dimensions"][0]

              //get metric, e.g. 15
              var metric = rows[i]["metrics"][0]["values"][0]

              data_rows[dimension] = metric
            }
          }

          console.log(data_rows);
          console.log(data_rows['18-24']);
          console.log(data_rows['25-34']);
          resolve(data_rows);
        })
        });
  }

}
