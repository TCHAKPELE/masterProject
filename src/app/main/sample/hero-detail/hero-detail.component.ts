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
  hero: Hero = { "name": "0", "Force": 0, "Intelligence": 0, "Resistance": 0, "id": 0, "Role": "Guerrier" };
  public contentHeader: ContentHeader;

  stat1 = 0;
  stat2 = 0;
  stat3 = 0;
  stat4 = 0;
  stat5 = 0;
  stat6 = 0;
  stat7 = 0;

  public radioModel = 1;

  private grid_line_color = 'rgba(200, 200, 200, 0.2)'; // RGBA color helps in dark layout


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

  Affinity(): void {


    if (this.hero.Role == "Guerrier") {

      this.stat4 = 25;
      this.stat5 = 50;
      this.stat6 = 50;
      this.stat7 = 25;

    }
    else
      if (this.hero.Role == "Mage") {

        this.stat4 = 75;
        this.stat5 = 100;
        this.stat6 = 75;
        this.stat7 = 75;

      }
      else
        if (this.hero.Role == "Soigneur") {

          this.stat4 = 50;
          this.stat5 = 50;
          this.stat6 = 50;
          this.stat7 = 50;

        }
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
    this.Affinity();
    this.stat1 = this.hero.Intelligence;
    this.stat2 = this.hero.Resistance;
    this.stat3 = this.hero.Force;

  }

  getHero(): void {
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

  // ng2-flatpickr options
  public DateRangeOptions = {
    altInput: true,
    mode: 'range',
    altInputClass: 'form-control flat-picker bg-transparent border-0 shadow-none flatpickr-input',
    defaultDate: ['2021-05-01', '2021-05-10'],
    altFormat: 'Y-n-j'
  };

  // radar Chart
  public radarChart = {
    chartType: 'radar',

    labels: ['INT', 'STR', 'RES', 'FIRE', 'WATER', 'WIND', 'EARTH'],
    datasets: [
      {
        label: 'Physique',
        data: [this.stat1, this.stat3, this.stat2, 0, 0, 0, 0],
        fill: true,
        backgroundColor: 'rgba(255,161,161, 0.9)',
        borderColor: 'transparent',
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent'
      },
      {
        label: 'Affinité élémentaire',
        data: [0, 0, 0, this.stat4, this.stat5, this.stat6, this.stat7],
        fill: true,
        backgroundColor: 'rgba(155,136,250, 0.9)',
        borderColor: 'transparent',
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent'
      }
    ],

    options: {
      responsive: true,
      maintainAspectRatio: false,
      responsiveAnimationDuration: 500,
      legend: {
        position: 'top',
        labels: {
          padding: 25
        }
      },
      layout: {
        padding: {
          top: -20
        }
      },
      tooltips: {
        enabled: false,
        custom: function (tooltip) {
          var tooltipEl = document.getElementById('tooltip');
          if (tooltip.body) {
            tooltipEl.style.display = 'block';
            if (tooltip.body[0].lines && tooltip.body[0].lines[0]) {
              tooltipEl.innerHTML = tooltip.body[0].lines[0];
            }
          } else {
            setTimeout(function () {
              tooltipEl.style.display = 'none';
            }, 500);
          }
        }
      },
      gridLines: {
        display: false
      },
      scale: {
        ticks: {
          maxTicksLimit: 1,
          display: false
        },
        gridLines: {
          color: this.grid_line_color
        },
        angleLines: { color: this.grid_line_color }
      }
    }
  };
}



