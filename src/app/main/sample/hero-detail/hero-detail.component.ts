import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { Hero } from '../../../hero';
import { HeroService } from '../../../heroes.service';
import { locale as en } from '../i18n/en';
import { locale as fr } from '../i18n/fr';
import { locale as de } from '../i18n/de';
import { locale as pt } from '../i18n/pt';

import { CoreTranslationService } from '@core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { ContentHeader } from '../../../layout/components/content-header/content-header.component';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  public contentHeader: ContentHeader

  constructor(
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private heroService: HeroService,
    private location: Location,
    private _coreTranslationService: CoreTranslationService
  ) {
    this._coreTranslationService.translate(en, fr, de, pt);
    this.translateService.onLangChange.subscribe(() => this.update_content_header());
  }

  ngOnInit(): void {

    this.contentHeader = {
      headerTitle: this.translateService.instant('SAMPLE.HEROES'),
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: this.translateService.instant('SAMPLE.HEROES'),
            isLink: true,
            link: '/'
          },
          {
            name: this.translateService.instant('SAMPLE.Details'),
            isLink: false
          }

        ]
      }
    }
    this.getHero();


  }

  getHero(): void {
    // const Name = (this.route.snapshot.paramMap.get('name'));
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();


  }

  save(): void {
    console.log(this.hero);
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  update_content_header(): void {
    this.contentHeader.headerTitle = this.translateService.instant('SAMPLE.HEROES');
    this.contentHeader.breadcrumb.links[0].name = this.translateService.instant('SAMPLE.HEROES');
    this.contentHeader.breadcrumb.links[1].name = this.translateService.instant('SAMPLE.Details');

  }
}



