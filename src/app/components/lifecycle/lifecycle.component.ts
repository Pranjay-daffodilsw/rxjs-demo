import {
  Component,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
  Input,
  AfterContentInit,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  templateUrl: './lifecycle.component.html',
})
export class LifecycleComponent implements
  OnInit,
  OnChanges,
  // DoCheck,
  AfterContentInit,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {

  DummyVariable = console.log("I am a variable declaration before constructor");
  public inputValue: string = '';

  constructor() {
    console.log("I am the constructor");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges called with changes - ", changes,this.inputValue);
  }

  ngOnInit() {
    console.log("ngOnInit called now");
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit called');
  }

  // ngAfterContentInit
  // ngAfterContentChecked

  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called');
  }

  // ngDoCheck() {
  //   console.log('ng do check called');
  // }

  ngOnDestroy() {
    console.log('ngOnDestroy called');
  }


}