import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(
    private http: HttpClient,
  ){}

  getPosts() {
    return this.http.get('https://ngrx-demo-d7dd3-default-rtdb.asia-southeast1.firebasedatabase.app/posts');
  }
}
