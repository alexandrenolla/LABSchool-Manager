import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Pedagogue } from 'src/app/shared/models/IPedagogue';

@Component({
  selector: 'lab-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  error = ''
  loginForm: FormGroup;
  users: Pedagogue[] = []

  constructor(private formBuilder: FormBuilder, private service: LoginService) {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });
  }

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.service.getLogin()
      .subscribe((users) => {
        this.users = users

        for (let user of this.users) {
          if (email === user.email && password === user.password) {
            alert('Logged in successfully!')
            break
          }
          else {
            this.error = 'Invalid email or password';
          }

        }
      })
  }

  onCreateAccount() {
    alert('Create Account clicked');
  }
}
