import { Component, ViewEncapsulation } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import { fadeInLeft, zoomIn, fadeIn } from '@core/animations/core.animation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInLeft, zoomIn, fadeIn]
})
export class ContentComponent {
  public coreConfig: any;
  public animate;

  // Private
  private _unsubscribeAll: Subject<any>;

  
  constructor(private _coreConfigService: CoreConfigService) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  
  fadeInLeft(outlet) {
    if (this.animate === 'fadeInLeft') {
      return outlet.activatedRouteData.animation;
    }
    return null;
  }

  
  zoomIn(outlet) {
    if (this.animate === 'zoomIn') {
      return outlet.activatedRouteData.animation;
    }
    return null;
  }

  
  fadeIn(outlet) {
    if (this.animate === 'fadeIn') {
      return outlet.activatedRouteData.animation;
    }
    return null;
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On Init
   */
  ngOnInit(): void {
    // Subscribe config change
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
      this.animate = this.coreConfig.layout.animation;
    });
  }
}
