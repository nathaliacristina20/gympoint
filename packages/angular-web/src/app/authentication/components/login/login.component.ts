import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(

  ): void {
  }

  onSubmit(){
    const credentials = this.loginForm.value;
    console.log(credentials);
  }

}
