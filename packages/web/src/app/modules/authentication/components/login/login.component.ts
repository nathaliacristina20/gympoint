import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(

  ): void {
  }

  onSubmit(){
    const credentials = this.loginForm.value;
    console.log(credentials);

    this.authService.login(credentials)
    .subscribe(
      user => {
        this.router.navigateByUrl('/');
      },
      err => {
        console.error(err);
      }
    )

  }

}
