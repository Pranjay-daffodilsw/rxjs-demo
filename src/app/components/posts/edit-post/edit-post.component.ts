import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { updatePost } from '../state/posts.action';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.less']
})
export class EditPostComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  public postForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.postForm = new FormGroup({
      id: new FormControl(null, [
        Validators.required
      ]),
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10)
      ])
    })
  }

  ngOnInit(): void {
    this.subscription.add(
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id')!;
        this.subscription.add(
          this.store.select(getPostById(id))
            .subscribe(post => {
              this.postForm.setValue({
                id: post?.id,
                title: post?.title,
                description: post?.description,
              })
            })
        );
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onUpdatePost(): void {
    if (this.postForm.valid) {
      const post = this.postForm.value;
      this.store.dispatch(updatePost({ post }));
      this.router.navigate(['posts']);
    }
  }

}
