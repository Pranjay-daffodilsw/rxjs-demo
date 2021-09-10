import { Component, OnInit } from '@angular/core';
import {
  Observable,
  Subject,
  from,
  interval,
  ConnectableObservable,
  Subscription,
  BehaviorSubject,
  ReplaySubject,
  AsyncSubject,
  timer,
  combineLatest,
  of
} from 'rxjs';
import { delay, multicast, refCount, startWith, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-example',
  templateUrl: './rxjs-example.component.html'
})
export class RxjsExampleComponent implements OnInit {
  constructor() {
  }

  public subject = new Subject<number>();

  ngOnInit() {

    // this.useObservable();
    // this.useSubject();
    // this.showMulticastObservable();
    // this.referenceCounting();
    // this.referenceCountingWithRefCount()
    // this.behaviourSubject();
    // this.replaySubject();
    // this.replaySubjectWithBufferTime();
    // this.ascyncSubject();
    // this.voidSubject();
    this.combineLatest();
  }

  private useObservable() {
    const observable = new Observable((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });
    observable.subscribe({
      next: (value) => {
        console.log('next value - ', value);
      },
      complete: () => {
        console.log('completed');
      }
    });
  }

  private useSubject() {
    this.subject.subscribe({
      next: (value) => { console.log('observer a - ' + value) }
    })

    this.subject.subscribe({
      next: (value) => { console.log('observer b - ' + value) }
    });

    const observable = from([1, 2, 3]);

    const subscription = observable.subscribe(this.subject);
  }

  private showMulticastObservable() {

    const source = from([1, 2, 3]);
    const subject = new Subject();

    const multicasted = source.pipe(multicast(subject));


    multicasted.subscribe({
      next: (value) => { console.log('observation a -' + value) }
    })


    multicasted.subscribe({
      next: (value) => { console.log('observation b -' + value) }
    })

    // @ts-ignore
    multicasted.connect()

  }

  private referenceCounting() {
    const source = interval(500);
    const subject = new Subject();
    const multicasted = source.pipe(multicast(subject)) as ConnectableObservable<any>;
    let subscription1: Subscription,
      subscription2: Subscription,
      subscriptionConnect: Subscription;

    subscription1 = multicasted.subscribe({
      next: (value) => { console.log('value in observer a - ', value) }
    });

    subscriptionConnect = multicasted.connect();

    setTimeout(() => {
      subscription2 = multicasted.subscribe({
        next: (value) => { console.log('value in observer b -', value) }
      })
    }, 600);

    setTimeout(() => {
      subscription1.unsubscribe()
    }, 1200);

    setTimeout(() => {
      subscription2.unsubscribe();
      subscriptionConnect.unsubscribe()
    }, 2000);

  }


  private referenceCountingWithRefCount() {
    const source = interval(500);
    const subject = new Subject();
    const refCounted = source.pipe(multicast(subject), refCount());
    let subscription1: Subscription, subscription2: Subscription;

    console.log('observer a subscribed');
    subscription1 = refCounted.subscribe({
      next: (value) => { console.log('value in observer a - ', value) }
    });

    setTimeout(() => {
      console.log('observer b subscribed');
      subscription2 = refCounted.subscribe({
        next: (value) => { console.log('value in observer b -', value) }
      })
    }, 600);

    setTimeout(() => {
      console.log('observer a unsubscribed');
      subscription1.unsubscribe()
    }, 1200);

    setTimeout(() => {
      console.log('observer b unsubscribed');
      subscription2.unsubscribe();
    }, 2000);
  }

  private behaviourSubject() {
    const subject = new BehaviorSubject(0);
    subject.subscribe({
      next: (value) => { console.log('observer 1 subscribed value - ', value) }
    })
    subject.next(1);
    subject.next(2);
    subject.subscribe({
      next: (value) => { console.log('observer 2 subscribed value - ', value) }
    })
    subject.next(3);
  }

  private replaySubject() {
    const subject = new ReplaySubject(3);
    subject.subscribe({
      next: (value) => { console.log('observable 1 value - ', value) }
    })
    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);
    subject.subscribe({
      next: (value) => { console.log('observable 2 value - ', value) }
    })
    console.log('trigger new value - 4');
    subject.next(5)
  }

  private replaySubjectWithBufferTime() {
    const subject = new ReplaySubject(100, 500);
    subject.subscribe({
      next: (value) => { console.log('observable 1 value - ', value) }
    })
    let i = 1;
    setInterval(() => { subject.next(i++) }, 200);
    setTimeout(() => {
      subject.subscribe({
        next: (value) => { console.log('observable 2 value - ', value) }
      })
    }, 1000)
  }

  private ascyncSubject() {
    const subject = new AsyncSubject();
    subject.subscribe({
      next: (value) => { console.log('observable 1 value - ', value) }
    });
    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);
    subject.next(5);
    subject.subscribe({
      next: (value) => { console.log('observer 2 value - ', value) }
    })
    subject.next(5);
    subject.complete();
  }

  private voidSubject() {
    const subject = new Subject();
    subject.subscribe({
      next: () => { console.log('one second has passed') }
    });
    setInterval(() => { subject.next() }, 1000)
  }

  private combineLatest() {
    const firstTimer = timer(0, 1000);
    const secondTimer = timer(500, 200);
    const combinedTimer = combineLatest([firstTimer, secondTimer]);
    combinedTimer.pipe(take(10)).subscribe(value => { console.log(value); });

  }


};

