import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { PostModel } from 'src/app/models/post-payload';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  paramLink: number;
  post: PostModel;

  constructor(private router: ActivatedRoute, private postservice: PostService) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.paramLink = params.id;
    });

    this.postservice.getSinglePost(this.paramLink)
      .subscribe((data: PostModel) => {
        this.post = data;
      }, (error) => {
        console.error('ERR_FAILURE_RESPONSE');
      });
  }

}
