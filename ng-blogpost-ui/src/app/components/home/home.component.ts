import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { PostModel } from 'src/app/models/post-payload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: PostModel[];

  constructor(private post: PostService) { }

  ngOnInit() {
    this.post.getAllPost()
      .subscribe((data: PostModel[]) => {
        this.posts = data;
        console.log(data);
      }, error => {
        console.error('ERR_FAILURE_RETRIVE POSTS');
      });
  }

}
