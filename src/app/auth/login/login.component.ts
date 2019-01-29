import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../utility/BaseComponent';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {NavigatorService} from '../../utility/navigator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(protected navigator: NavigatorService) {
    super();
  }
  form: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(environment.MINIMUM_PASSWORD_LENGTH)])
    });
  }

  login() {
      this.isFailed = true;
      this.errorMessage = 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum m Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsm Lorem ipsum Lorem ipsum Lorem ipsum Lorem ips ';
  }

  isPasswordDirty() {
    const password = this.form.controls['password'];
    return password.touched && !password.valid && password.dirty && '' !== password.value;
  }

  toRegister() {
    this.navigator.toRegisterScreen();
  }

  isEmailDirty() {
    const mail = this.form.controls['email'];
    return mail.touched && !mail.valid && mail.dirty && '' !== mail.value;
  }

  inputChange(data) {
    data.target.value = data.target.value + '';
  }
}
