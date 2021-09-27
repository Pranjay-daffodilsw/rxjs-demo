import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/state/app.state';
import { deletePost, loadPosts } from '../state/posts.action';
import { getPosts } from '../state/posts.selector';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.less']
})
export class PostsListComponent implements OnInit {
  public posts!: Observable<Array<Post>>

  constructor(
    public store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
  }

  onDelete(id: string): void {
    if (confirm("Are you sure you want to delete the post")) {
      this.store.dispatch(deletePost({ id }));
    }
  }

}
