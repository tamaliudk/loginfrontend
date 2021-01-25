import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../authentication.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  returnUrl: string;
  isLogged = false;
  errors: boolean;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  SignUpForm = this.fb.group(
    {
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]),
      // tslint:disable-next-line:max-line-length
      confirmPassword: new FormControl('', [Validators.required])

    }, {
    validator: this.passwordMatchValidator(
      "password", "confirmPassword"
    )
  }
  );

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams[this.returnUrl] || '/home';
  }


  onSubmit() {
    console.log(this.SignUpForm.value);
    this.authService.register(this.SignUpForm.value).subscribe(data => {
      this.router.navigate([this.returnUrl], { queryParams: data });
      this.isLogged = true;
      console.log("data" + data.username);
    },
      error => {
        this.errors = true;
      });
  }

  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

}

