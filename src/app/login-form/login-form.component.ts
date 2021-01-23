import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  returnUrl: string;
  loading = false;

  LoginForm = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    Password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) {


    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams[this.returnUrl] || '/';
  }
  get f() { return this.LoginForm.controls; }


  // Login() {

  //   console.log(this.f.Email.value);
  //   this.authService.login(this.f.Email.value, this.f.Email.value)
  //     .subscribe(
  //       data => {
  //         this.router.navigate([this.returnUrl]);
  //       });
  // }

  Login() {
    this.loading = true;
    this.authService.login(this.f.Email.value, this.f.Password.value)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loading = false;
        });
  }



}
