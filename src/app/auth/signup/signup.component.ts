import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { setLoadingSpinner } from 'src/app/state/shared/shared.actions';
import { signupStart } from '../state/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  constructor(
    private store: Store<AppState>,
  ) {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  ngOnInit(): void {
  }

  onSignUpSubmit() {
    if (this.signupForm.valid) {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(signupStart(this.signupForm.value))
    }
  }

}
