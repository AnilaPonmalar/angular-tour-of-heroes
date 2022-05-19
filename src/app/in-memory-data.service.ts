import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero-model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes : Hero[] = [
      { id: 11, name: 'Doctor   Nice', email :'' },
      { id: 12, name: 'Narco' , email :'' },
      { id: 13, name: 'Bombasto' , email :'' },
      { id: 14, name: 'Celeritas' , email :'' },
      { id: 15, name: 'Magneta' , email :'' },
      { id: 16, name: 'RubberMan', email :''  },
      { id: 17, name: 'Dynama' , email :'' },
      { id: 18, name: 'Dr IQ' , email :'' },
      { id: 19, name: 'Magma', email :''  },
      { id: 20, name: 'Tornado' , email :'' }
    ];
    return {heroes};
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