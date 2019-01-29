import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {BaseComponent} from '../../utility/BaseComponent';
import {MatchPasswordValidator} from '../../utility/Utilities';
import {UserModel} from '../../models/user.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit, OnDestroy  {

  constructor(protected route: ActivatedRoute) {
    super();
  }
  form: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  initForm() {
      this.form = new FormGroup({
        'username': new FormControl('', [Validators.required, Validators.email]),
        'passwords': new FormGroup({
          'password': new FormControl('', [Validators.required, Validators.minLength(environment.MINIMUM_PASSWORD_LENGTH)]),
          'repeat': new FormControl('', [Validators.required, Validators.minLength(environment.MINIMUM_PASSWORD_LENGTH)])
        }, [MatchPasswordValidator])
      });
    }

  register() {
    const user = new UserModel();
    user.password = this.form.get('passwords').value['password'];
    user.username = this.form.value['username'];
  }

  invalidPasswords(): boolean {
    const passwords = this.form.get('passwords');
    const password = passwords.get('password');
    const repeat = passwords.get('repeat');
    return (password.dirty && password.invalid && password.touched) ||
      (repeat.dirty && repeat.invalid && repeat.touched);
  }

  diffrentPasswords(): boolean {
    const passwords = this.form.get('passwords');
    const password = passwords.get('password');
    const repeat = passwords.get('repeat');
    return (passwords.invalid && passwords.touched && passwords.dirty) &&
      (password.valid && repeat.valid);
  }

  invalidEmail(): boolean {
    const username = this.form.get('username');
    return username.touched && !username.valid && username.dirty && username.value.length > 0;
  }
}
