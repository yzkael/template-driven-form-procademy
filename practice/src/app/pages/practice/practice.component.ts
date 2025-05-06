import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-practice',
  imports: [FormsModule, CommonModule],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.css',
})
export class PracticeComponent {
  user = {
    name: '',
    email: '',
    password: '',
    terms: false,
  };

  isLoading = false;
  submitError: string | null = null;
  userServices = inject(UserService);
  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;
    this.submitError = null;

    this.userServices.register(this.user).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Handle successful registration (e.g., redirect, show success message)
      },
      error: (error: any) => {
        this.isLoading = false;
        this.submitError =
          error.message || 'Registration failed. Please try again.';
      },
    });
  }
}
