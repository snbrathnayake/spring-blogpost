import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/models/post-payload';
import { PostService } from 'src/app/services/post.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  postForm: FormGroup;
  postPayload: PostModel;

  title = new FormControl('');
  content = new FormControl('');

  constructor(private post: PostService, private router: Router , private $localStorage: LocalStorageService) {
    this.postForm = new FormGroup({
      title: this.title,
      content: this.content,
    });

    this.postPayload = {
      id: '',
      title: '',
      content: '',
      username: ''
    };
  }

  onSubmit() {
    // this.postPayload.username = localStorage.getItem('username');
    // this.postPayload.username = this.$localStorage.retrieve('username');
    this.postPayload.title = this.postForm.get('title').value;
    this.postPayload.content = this.postForm.get('content').value;

    this.post.createPost(this.postPayload)
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigateByUrl('/blog-hubs');

      }, error => {
        console.error('ERR_FAILURE_RESPONSE');
      });
  }

}
