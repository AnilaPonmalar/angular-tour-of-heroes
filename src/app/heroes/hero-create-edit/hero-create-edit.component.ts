import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Hero } from 'src/app/hero-model';
import { HeroService } from 'src/app/hero.service';

@Component({
  selector: 'app-hero-create-edit',
  templateUrl: './hero-create-edit.component.html',
  styleUrls: ['./hero-create-edit.component.css']
})
export class HeroCreateEditComponent implements OnInit {
  
   heroUrlId: number |undefined;

   isCreateHero: boolean = true;
   
   HeroForm =this.fb.group({
      heroName : [''],
      email : [''],
      skills: this.fb.group({
        skillName:  [''],
        experienceInYears:  [''],
        proficiency:  [''],
      })
    })

    newHero: Hero | undefined;  

    editHero: Hero | undefined;  
  
    constructor(private fb: FormBuilder, private heroService: HeroService, private route: ActivatedRoute,
      private router: Router) { }
  
    ngOnInit(): void {
      this.getHero();
    }
  
    getHero(): void {
      this.heroUrlId = Number(this.route.snapshot.paramMap.get('id'));
      if(this.heroUrlId)
        {
          this.isCreateHero=false;
          this.heroService.getHero(this.heroUrlId)
          .subscribe(hero => {this.editHero = hero; this.updateProfile(hero)});
        }
     
    }
  
    updateProfile(hero : Hero) {
      this.HeroForm.patchValue({
        heroName: hero.name,
       
      });
    }
  
   
    onSubmit(form: any) {
    
     if ( !form.valid && !form.controls.heroName.value) { return; }

     if(this.isCreateHero)
     {
     this.heroService.addHero({name: form.controls.heroName.value } as Hero)
       .subscribe(hero => {
         this.newHero=hero;     
        
       });

      }
      else
      {
        if (form.controls.heroName.value && this.editHero) {

          const hero = {id:this.editHero.id, name:form.controls.heroName.value, email:'' }
          this.heroService.updateHero(hero as Hero)
            .subscribe()
        }
      }

      this.router.navigate(['heroes'])
    }
  
  }
 
