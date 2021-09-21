import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { State, Store } from '@ngrx/store';
import { addPost } from '../state/posts.action';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.less']
})
export class AddPostComponent implements OnInit {
  public postForm: FormGroup;
  constructor(
    public store: Store
  ) {
    this.postForm = new FormGroup({
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

  }

  onAddPost() {
    console.log(this.postForm.value);
    if (this.postForm.valid) {
      const post = {
        ...this.postForm.value
      }
      this.store.dispatch(addPost({
        post
      }));
    }
  }

}
