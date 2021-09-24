import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';
import { RxjsExampleComponent } from './components/rxjs-example/rxjs-example.component';
import { PeekABooDirective } from './directives/peekABoo.directive';
import { HomeComponent } from './components/home/home.component';
import { SampleComponent } from './components/sample/sample.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootStrapModuleImports } from './bootstrapModuleImports';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { appReducer } from './state/app.state';

@NgModule({
  declarations: [
    AppComponent,
    RxjsExampleComponent,
    LifecycleComponent,
    PeekABooDirective,
    HomeComponent,
    SampleComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer, {}),
    BrowserAnimationsModule,
    ...BootStrapModuleImports,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
