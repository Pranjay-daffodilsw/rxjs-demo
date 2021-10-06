import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.less']
})
export class SinglePostComponent implements OnInit {
  public post!: Observable<Post | null | undefined>;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.post = this.store.select(getPostById)
  }

}
