import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Superman', Intelligence: 25, Force: 45, Resistance: 55, Role: "Guerrier" },
      { id: 2, name: 'Flash', Intelligence: 10, Force: 22, Resistance: 85, Role: "Mage" },
      { id: 3, name: 'Green lantern', Intelligence: 35, Force: 65, Resistance: 45, Role: "Soigneur" },
      { id: 4, name: 'Wolverine', Intelligence: 55, Force: 75, Resistance: 15, Role: "Guerrier" },
      { id: 5, name: 'Thor', Intelligence: 85, Force: 10, Resistance: 65, Role: "Guerrier" },
    ];
    return { heroes };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}