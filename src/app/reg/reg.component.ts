import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { ICountries, RegService } from '../services/reg.service';
import { UserService } from '../services/user.service';
import { PasswordValidator } from '../shared/password.validator';
import * as alertify from 'alertifyjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  public countries: ICountries[] = [];
  public companies: String[] = [];
  //user: User;

  regForm: FormGroup;
  hasSubmitted: boolean;

  get name() { return this.regForm.get('name'); }
  get age() { return this.regForm.get('age'); }
  get company() { return this.regForm.get('company'); }
  get country() { return this.regForm.get('country'); }
  get phone() { return this.regForm.get('phone'); }
  get gender() { return this.regForm.get('gender'); }
  get userName() { return this.regForm.get('userId'); }
  get password() { return this.regForm.get('pass'); }
  get confirm() { return this.regForm.get('confirm'); }


  constructor(private fb: FormBuilder, private regService: RegService, private userService: UserService, private router : Router) {
    this.regForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.maxLength(2), Validators.pattern('[0-9]*$')]],
      company: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*$')]],
      gender: ['', Validators.required],
      userId: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9\-]+$")]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', Validators.required]
    }, { validator: PasswordValidator });
  }
  ngOnInit(): void {
    this.regService.getCountries().subscribe(data => this.countries = data);
    this.regService.getCompanies().subscribe(data => this.companies = data);
  }

  onSubmit() {
    this.hasSubmitted = true;
    if (this.regForm.valid) {
      //console.log(this.regForm.value);
      let user: User = {
        name: this.name.value,
        age: this.age.value,
        company: this.company.value,
        country: this.country.value,
        phone: this.phone.value,
        gender: this.gender.value,
        username: this.userName.value,
        password: this.password.value
      }

      // This will go to Userservice class and add the user to the existing users array in localstorage
      this.userService.addUser(user);
      //localStorage.setItem('Users',JSON.stringify(this.regForm.value));
      this.regForm.reset();
      this.hasSubmitted = false;
      alertify.success('Congrats !! you are successfully registered. Please login now.');
      this.router.navigate(['/']);
    }
    else{
      alertify.error('Kindly provide the required fields');
    }
  }

}

  // After creating UserService class, confirm password is saving in local storage. But we dont want to save that. 
  // So created User Model and initialising values in the userData() method.
  // userData(): User {
  //   return this.user = {
  //     name: this.name.value,
  //     age: this.age.value,
  //     company: this.company.value,
  //     country: this.country.value,
  //     phone: this.phone.value,
  //     gender: this.gender.value,
  //     username: this.userName.value,
  //     password: this.password.value
  //   }
  // }