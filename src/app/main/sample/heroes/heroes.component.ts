import { Component, OnInit, ViewChild } from '@angular/core';


import { Hero } from '../../../hero';
import { HeroService } from '../../../heroes.service';
import { locale as en } from '../i18n/en';
import { locale as fr } from '../i18n/fr';
import { locale as de } from '../i18n/de';
import { locale as pt } from '../i18n/pt';
import { CoreTranslationService } from '@core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { ContentHeader } from '../../../layout/components/content-header/content-header.component';
import { Observable, Subject } from 'rxjs';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  Baseheroes: Hero[];
  public selectedOption = 10;

  public modifyData = null;
  rows: Hero[];
  columns = [{ prop: 'name' }, { name: 'Intelligence' }, { name: 'Force' }, { name: 'Resistance' }, { name: 'Role' }];

  ColumnMode = ColumnMode;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private heroService: HeroService, private _coreTranslationService: CoreTranslationService,
    private translateService: TranslateService, private route: ActivatedRoute) {

    this._coreTranslationService.translate(en, fr, de, pt);
    if (route.snapshot.params.id) {
      this.modifyData = { id: route.snapshot.params.id };
    }
    this.translateService.onLangChange.subscribe(() => this.update_content_header());
  }

  public contentHeader: ContentHeader;
  public selectRole: any = [
    { name: 'All', value: 'All' },
    { name: 'Guerrier', value: 'Guerrier' },
    { name: 'Mage', value: 'Mage' },
    { name: 'Soigneur', value: 'Soigneur' }
  ];

  public selectedRole = [];


  public previousRoleFilter = new Subject<string>();


  filterUpdate(event) {

    // Reset ng-select on search
    this.selectedRole = this.selectRole[0];


    const val = event.target.value.toLowerCase();

  }


  filterByRole(event) {
    const filter = event.value;
    //console.log(this.Baseheroes);

    if (filter === "All") {

      this.rows = this.Baseheroes;
      this.heroService.getHeroes()
        .subscribe(heroes => heroes = this.rows);
    }
    else {
      this.rows = this.Baseheroes.filter(h => h.Role == filter);

      this.heroService.getHeroes()
        .subscribe(heroes => heroes = this.rows);

    }

  }

  ngOnInit() {
    this.contentHeader = {
      headerTitle: this.translateService.instant('SAMPLE.HEROES'),
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: this.translateService.instant('SAMPLE.HEROES'),
            isLink: true,
            link: '/heroes'
          },
          // {
          // name: 'Heroes',
          // isLink: false
          //}

        ]
      }
    }

    this.selectedRole = this.selectRole[0];
    this.getHeroes();
    this.heroesStatus();

  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(rows => this.rows = rows

      );
  }

  heroesStatus(): void {
    this.heroService.getHeroes()
      .subscribe(Baseheroes => this.Baseheroes = Baseheroes);

  }

  add(name: string): void {
    name = name.trim();
    var Intelligence = 0;
    var Force = 0;
    var Resistance = 0;
    var Role = "Guerrier";

    if (!name) { return; }
    this.heroService.addHero({ name, Intelligence, Force, Resistance, Role } as Hero)
      .subscribe(hero => {
        this.rows.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.rows = this.rows.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  update_content_header(): void {
    this.contentHeader.headerTitle = this.translateService.instant('SAMPLE.HEROES');
    this.contentHeader.breadcrumb.links[0].name = this.translateService.instant('SAMPLE.HEROES');

  }

}