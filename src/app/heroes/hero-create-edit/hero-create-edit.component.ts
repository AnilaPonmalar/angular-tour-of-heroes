import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, AsyncValidatorFn, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Hero } from 'src/app/hero-model';
import { HeroService } from 'src/app/hero.service';
import { forbiddenNameValidator } from 'src/app/shared/forbidden-name.directive';

@Component({
  selector: 'app-hero-create-edit',
  templateUrl: './hero-create-edit.component.html',
  styleUrls: ['./hero-create-edit.component.css']
})
export class HeroCreateEditComponent implements OnInit {
  //eventsSubject: Subject<any> = new Subject<any>();
   heroUrlId: number |undefined;

   isCreateHero: boolean = true;

   showChildComponentAddress : boolean =false;
   
   HeroForm =this.fb.group({
      heroName : ['',[
        Validators.required,
        Validators.minLength(4),forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]],
      email : ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      haveAddress: [false],
      //Validator for child form group address are set in child component 
      //since it will shown only on haveAddress checked
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      })
    })

    newHero: Hero | undefined;  

    editHero: Hero | undefined;  
  
    constructor(private fb: FormBuilder, private heroService: HeroService, private route: ActivatedRoute,
      private router: Router) { }
  
    ngOnInit(): void {
      this.getHero();
    }

    // emitEventToChild(requiredAddress : any) {
    //   this.eventsSubject.next(requiredAddress);
    // }
    get address() {
      return this.HeroForm.get('address') as FormGroup;
    }
    get heroName() { return this.HeroForm.get('heroName'); }
    
    get email() { return this.HeroForm.get('email'); }

    
    
    formValidStatus(count :any){
      console.log(count);
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
//to show the child component - hero address
    haveAddressCheck(event: any)
    {
    
      this.showChildComponentAddress = (event.target.checked)? true : false ;

     // const data = {requiredthings :this.showChildComponentAddress };
    //  this.emitEventToChild(data);
    }
  
    //setValue && patchValue
    updateProfile(hero : Hero) {
      this.HeroForm.patchValue({
        heroName: hero.name,
       
      });
    }
  
    onReset() {
    //  this.submitted = false;
      this.HeroForm.reset();
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
 
