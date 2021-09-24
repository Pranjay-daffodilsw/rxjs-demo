import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isAuthenticated } from 'src/app/auth/state/auth.selector';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  public isAuthenticated!: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated)
  }

}
