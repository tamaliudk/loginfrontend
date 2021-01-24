import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { AuthenticationService } from './../authentication.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) { }

  SignUpForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,30}$/)]),
    }
  );


  ngOnInit(): void {
  }


  onSubmit() {
    console.log(this.SignUpForm.value);
    this.authService.register(this.SignUpForm.value).subscribe(
      res => {
        console.log(res);
      }
    );
  }

}
