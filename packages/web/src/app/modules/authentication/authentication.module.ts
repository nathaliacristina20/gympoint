import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './authentication-routing.module';

import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule {

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: AuthenticationModule,
      providers: [
        AuthenticationInterceptor
      ]
    }
  }

}
