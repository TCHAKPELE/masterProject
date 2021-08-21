import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice', Intelligence: 25, Force: 45, Resistance: 55, Role: "Guerrier" },
      { id: 12, name: 'Narco', Intelligence: 10, Force: 22, Resistance: 85, Role: "Mage" },
      { id: 13, name: 'Bombasto', Intelligence: 35, Force: 65, Resistance: 45, Role: "Soigneur" },
      { id: 14, name: 'Celeritas', Intelligence: 55, Force: 75, Resistance: 15, Role: "Guerrier" },
      { id: 15, name: 'Magneta', Intelligence: 85, Force: 10, Resistance: 65, Role: "Soigneur" },
      { id: 16, name: 'RubberMan', Intelligence: 55, Force: 50, Resistance: 50, Role: "Guerrier" },
      { id: 17, name: 'Dynama', Intelligence: 65, Force: 66, Resistance: 75, Role: "Soigneur" },
      { id: 18, name: 'Dr IQ', Intelligence: 75, Force: 85, Resistance: 15, Role: "Guerrier" },
      { id: 19, name: 'Magma', Intelligence: 10, Force: 95, Resistance: 80, Role: "Soigneur" },
      { id: 20, name: 'Tornado', Intelligence: 45, Force: 60, Resistance: 25, Role: "Mage" }
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