import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../hero-model';
import { HeroService } from '../hero.service';
import { HeroCreateEditComponent } from './hero-create-edit/hero-create-edit.component';



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  
})
export class HeroesComponent implements OnInit {
  @ViewChild(HeroCreateEditComponent)
  set newHero(cmpt: HeroCreateEditComponent) {
    setTimeout(() => {
      this.heroes.push(cmpt.newHero as Hero);
    }, 0);
  
  }
  
  heroes: Hero[] = [];

  //will be called when this component initialize
  constructor( private heroService: HeroService, private router: Router) {
    //this.heroes = orderPipe.transform(this.heroes, 'hero.name');
  }

  ngOnInit(): void {
    this.getHeroes();
  }


add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.heroService.addHero({ name } as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
}

delete(hero: Hero): void {
  this.heroes = this.heroes.filter(h => h !== hero);
  this.heroService.deleteHero(hero.id).subscribe();
}

getHeroes(): void {
  this.heroService.getHeroes().subscribe(hereos => this.heroes= hereos);
}

}