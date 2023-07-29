import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm: FormGroup;
  loading = false;
  error = '';

  constructor(private router: Router) {

      this.registrationForm = new FormGroup({
      'fullName': new FormControl ('', Validators.required),

      'phoneNumber': new FormControl ('', [Validators.required, Validators.pattern(/^\(\d{2}\) \d \d{4}-\d{4}$/)]),

      'dateOfBirth': new FormControl ('', Validators.required),

      'cpf': new FormControl ('', [Validators.required, Validators.pattern(/\d{3}\.\d{3}\.\d{3}-\d{2}/)]),

      'email': new FormControl ('', [Validators.required, Validators.email]),

      'password': new FormControl ('', [Validators.required, Validators.minLength(8)]),
      
      'confirmPassword': new FormControl ('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }

    // Simulate API call to register the pedagogue
    this.loading = true;
    setTimeout(() => {
      // Needs logic here to register the user.
      // For this example, let's assume the registration is successful.

      // Redirect to the Login page after successful registration
      this.router.navigate(['/login']);
    }, 1500); // Simulating a delay for API response
  }
}
