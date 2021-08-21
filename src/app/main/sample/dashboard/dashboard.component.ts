import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../../heroes.service';
import { Hero } from '../../../hero';
import { locale as en } from '../i18n/en';
import { locale as fr } from '../i18n/fr';
import { locale as de } from '../i18n/de';
import { locale as pt } from '../i18n/pt';

import { CoreTranslationService } from '@core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';

import { ContentHeader } from '../../../layout/components/content-header/content-header.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(public heroService: HeroService, private _coreTranslationService: CoreTranslationService, private translateService: TranslateService) {

    this._coreTranslationService.translate(en, fr, de, pt);
    this.translateService.onLangChange.subscribe(() => this.update_content_header());
  }

  public contentHeader: ContentHeader

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: this.translateService.instant('SAMPLE.DASHBOARD'),
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: this.translateService.instant('SAMPLE.DASHBOARD'),
            isLink: true,
            link: '/dashboard'
          },
          //{
          // name: 'Dashboard',
          //isLink: false
          //}
        ]
      }
    }

    this.getHeroes();
  }


  update_content_header(): void {
    this.contentHeader.headerTitle = this.translateService.instant('SAMPLE.DASHBOARD');
    this.contentHeader.breadcrumb.links[0].name = this.translateService.instant('SAMPLE.DASHBOARD');

  }

}
