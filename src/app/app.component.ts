import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './state/app.state';
import { getErrorMessage, getLoading } from './state/shared/shared.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  public showLoading!: Observable<boolean>;
  public errorMessage!: Observable<string>;


  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);
  }

}
