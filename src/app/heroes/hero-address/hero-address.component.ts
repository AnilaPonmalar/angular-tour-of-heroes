import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-hero-address',
  templateUrl: './hero-address.component.html',
  styleUrls: ['./hero-address.component.css']
})
export class HeroAddressComponent implements OnInit {
 // private eventsSubscription!: Subscription


  @Input() addressFormGroup!: FormGroup;
  @Input() events!: Observable<any>;
  
  setRequiredCondition!: any
  
  constructor() { 
  
  }
  ngOnInit(): void {
    this.setValidatorsforAddressFormGroup(true);

  //  this.eventsSubscription = this.events.subscribe((data) => this.doSomething(data));
     }
   
  
doSomething(data :any): void {
  console.log('Function not implemented.'+ data.requiredthings);
}

  ngOnDestroy() {
   this.setValidatorsforAddressFormGroup(false);
    // no need to unsubscribe as it not subscribing true condition
   // this.eventsSubscription.unsubscribe();
  }

  setValidatorsforAddressFormGroup(setValidaters : boolean) {
    if(setValidaters)
      {
        console.log("setValidaters"+setValidaters);

        this.addressFormGroup.controls['street'].setValidators([Validators.required]);
        this.addressFormGroup.controls['street'].updateValueAndValidity();
        this.addressFormGroup.controls['city'].setValidators([Validators.required]);
        this.addressFormGroup.controls['city'].updateValueAndValidity();
        this.addressFormGroup.controls['state'].setValidators([Validators.required]);
        this.addressFormGroup.controls['state'].updateValueAndValidity();
        this.addressFormGroup.controls['zip'].setValidators([Validators.required,Validators.minLength(6)]);
        this.addressFormGroup.controls['zip'].updateValueAndValidity();
      }
    else
      {  
        console.log("setValidaters" +setValidaters)
      
        this.addressFormGroup.controls['street'].clearValidators();
        this.addressFormGroup.controls['street'].updateValueAndValidity();
        this.addressFormGroup.controls['city'].clearValidators();
        this.addressFormGroup.controls['city'].updateValueAndValidity();
        this.addressFormGroup.controls['state'].clearValidators();
        this.addressFormGroup.controls['state'].updateValueAndValidity();
        this.addressFormGroup.controls['zip'].clearValidators();
        this.addressFormGroup.controls['zip'].updateValueAndValidity();
      
        this.addressFormGroup.clearValidators();
        this.addressFormGroup.updateValueAndValidity();
      }
  }

  get street() {
    return this.addressFormGroup.get('street')
   }
   get city() {
    return this.addressFormGroup.get('city')
   }
   get state() {
    return this.addressFormGroup.get('state')
   }

   get zip() {
    return this.addressFormGroup.get('zip')
   }

}



