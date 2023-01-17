import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit, OnDestroy {
  public isShow: boolean = false;
  private sub: any;
  constructor(private _loadingService: LoadingService) { }

  ngOnInit() {
    this.sub = this._loadingService.loading.pipe(
      debounceTime(200),
      distinctUntilChanged())
      .subscribe((data: boolean) => {
        this.isShow = data;
      });
  }

  ngOnDestroy(): any {
    this.sub.unsubscribe();
  }
}


