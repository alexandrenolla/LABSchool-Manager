import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lab-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    // Simulate API call to validate credentials
    this.loading = true;
    setTimeout(() => {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      // Here you should implement your own logic to check if the email and password are valid and registered.
      // For this example, let's assume a valid email/password combination.
      if (email === 'user@example.com' && password === 'password') {
        // Redirect to the Home page after successful login (you need to import Router and set it up in your app)
        // this.router.navigate(['/home']);
        alert('Logged in successfully!');
      } else {
        this.error = 'Invalid email or password';
      }
      this.loading = false;
    }, 1500); // Simulating a delay for API response
  }

  onCreateAccount() {
    // Implement logic to navigate to the Pedagogue registration form (you need to import Router and set it up in your app)
    // this.router.navigate(['/pedagogue-registration']);
    alert('Create Account clicked');
  }
}
