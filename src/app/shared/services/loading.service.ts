import { Injectable } from '@angular/core';
import { Observable, Observer, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoadingService {
  loading: Observable<boolean>;
  private _observer: Observer<boolean> | undefined;

  constructor() {
      this.loading = new Observable<boolean>(observer => this._observer = observer).pipe(share());
  }

  toggleLoading(value: boolean) {
      if (this._observer) {
          this._observer.next(value);
      }
  }
}
