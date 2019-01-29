import {FormGroup} from '@angular/forms';
import {UserModel} from '../models/user.model';

export class Utilities {

  static SaveTokenToLocalStorage(user: UserModel) {
    window.localStorage.setItem('token', user.token);
  }
}

export enum FileMatchers {
  IMAGES = '(PNG|BMP|JPG|JPEG)$',
}

export function MatchPasswordValidator(form: FormGroup) {
  if (form.value['password'] !== form.value['repeat']) {
    return {'incorrect': true };
  }
  return null;
}
