import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(
    private http: HttpClient,
  ) { }

  getPosts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>
      ('https://ngrx-demo-d7dd3-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
      .pipe(
        map((data: any) => {
          if (Array.isArray(data) && data.length) {
            return data.filter(el => Boolean(el));
          } else {
            const posts: Array<Post> = [];
            for (let key in data) {
              posts.push({ ...data[key], id: key });
            }
            return posts ?? [];
          }
        })
      );
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      'https://ngrx-demo-d7dd3-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      {
        ...post
      }
    );
  }

  updatePost(post: Post) {
    const body = {
      [post.id]: {
        title: post.title,
        description: post.description,
      }
    }
    return this.http.patch(
      'https://ngrx-demo-d7dd3-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      body
    );
  }

  deletePost(id: string) {
    return this.http.delete(
      `https://ngrx-demo-d7dd3-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${id}.json`
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(
      `https://ngrx-demo-d7dd3-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${id}.json`
    )
  }
}
