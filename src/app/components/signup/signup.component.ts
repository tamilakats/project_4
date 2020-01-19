import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  visibility: boolean = true;

  onStepOne() {
    this.visibility = !this.visibility;
  }

  constructor(public authService: AuthService) {}

  onSignUp(form: NgForm) {
    console.log(form.value.password);
    this.authService.createUser(form.value.userid, form.value.email, form.value.password, form.value.city, form.value.street, form.value.name, form.value.lastname);
  }
}
