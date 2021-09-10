import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';
import { RxjsExampleComponent } from './components/rxjs-example/rxjs-example.component';
import { PeekABooDirective } from './directives/peekABoo.directive';

@NgModule({
  declarations: [
    AppComponent,
    RxjsExampleComponent,
    LifecycleComponent,
    PeekABooDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
