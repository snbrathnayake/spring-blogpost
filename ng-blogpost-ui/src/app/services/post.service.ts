import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from '../models/post-payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(payload: PostModel): Observable<any> {
    return this.http.post(`${this.API_URL}`, payload);
  }

  getAllPost(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${this.API_URL}/all`);
  }

  getSinglePost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(`${this.API_URL}/get/${id}`);
  }

  get API_URL(): string {
    return 'http://localhost:8090/api/posts';
  }
}
