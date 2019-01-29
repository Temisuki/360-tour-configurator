import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class NavigatorService {

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  toRegisterScreen() {
    this.router.navigate(['register']);
  }

  toLoginScreen() {
    this.router.navigate(['login']);
  }

}
