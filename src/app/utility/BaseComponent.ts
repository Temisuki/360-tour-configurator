import {Subscription} from 'rxjs';

export class BaseComponent {
  isLoading = false;
  subscriptions: Subscription[];

  constructor() {
    this.subscriptions = [];
  }

  addSubscription(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  unsubscribeAll(): void {
    this.subscriptions.forEach(sub => {
      if (sub instanceof Subscription && sub) {
        sub.unsubscribe();
      }
    });
  }
}
