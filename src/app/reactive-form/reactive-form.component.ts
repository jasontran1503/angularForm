import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  formSignIn: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formSignIn = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")]],
      email: this.fb.array([
        this.fb.control('', [Validators.required, Validators.email])
      ]),
      phone: this.fb.array([
        this.fb.control('', [Validators.required, Validators.pattern("[0-9]+")])
      ]),
      message: ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  onSubmit(){
    console.log(this.formSignIn.value);
  }

  get email(): FormArray {
    return this.formSignIn.get('email') as FormArray;
  }

  addEmail(){
    this.email.push(this.fb.control('', [Validators.required, Validators.email]));
  }

  removeEmail(i: number) {
    this.email.removeAt(i);
  }
  
  get phone(): FormArray {
    return this.formSignIn.get('phone') as FormArray;
  }

  addPhone(){
    this.phone.push(this.fb.control('', [Validators.required, Validators.pattern("[0-9]+")]));
  }

  removePhone(i: number) {
    this.phone.removeAt(i);
  }
}
