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
    return this.http
      .get('https://ngrx-demo-d7dd3-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
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
      ) as Observable<Array<Post>>;
  }
}
