import { Component, OnInit, Input } from '@angular/core';
import { GoogleAnalyticsService } from '../google-analytics.service';

@Component({
  selector: 'app-wordpress-blog-posts',
  templateUrl: './wordpress-blog-posts.component.html',
  styleUrls: ['./wordpress-blog-posts.component.scss']
})
export class WordpressBlogPostsComponent implements OnInit {

  @Input() blog_posts: any = [];

  @Input() category: string = "Missing";

  @Input() start_date: string = "Missing";
  @Input() end_date: string = "Missing";
  @Input() data_google_view_id: string = "Missing";

  constructor(private googleAnalyticsService: GoogleAnalyticsService) { }

  ngOnInit(): void {
  }

  ngOnChanges():void {

    this.iterateOverBlogPostsAndGetGoogleData().then((response: any) => console.log("finished"));

  }

  iterateOverBlogPostsAndGetGoogleData():any {
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
    console.log(relative_url);

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
          console.log("getGoogleDataAndUpdate");
          console.log(response);
          let data_rows = {
            users: response?.result?.reports?.[0].data?.rows?.[0]?.metrics[0]?.values[0],
            sessions: response?.result?.reports?.[0].data?.rows?.[0]?.metrics[0]?.values[1],
            pageviews: response?.result?.reports?.[0].data?.rows?.[0]?.metrics[0]?.values[2]
          }
          console.log("data_rows");
          console.log(data_rows);
          resolve(data_rows);
        })
        });


  }

}
