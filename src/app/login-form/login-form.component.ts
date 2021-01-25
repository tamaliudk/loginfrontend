import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs/operators';
import { User } from '../user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  showErrorMessage = false;
  returnUrl: string;
  loading = false;
  user = new User();
  errors: boolean;
  success: string;


  LoginForm = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    Password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams[this.returnUrl] || '/home';


  }
  get f() { return this.LoginForm.controls; }


  Login() {
    this.loading = true;

    // this.user.email = this.f.Email.value;
    // this.user.password = this.f.Password.value;

    this.authService.login(this.f.Email.value, this.f.Password.value)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.errors = true;
        });
  }



}
