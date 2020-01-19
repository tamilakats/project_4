import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public authService: AuthService) {}

  onLogin(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
  }
}
