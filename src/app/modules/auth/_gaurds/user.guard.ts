import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class UserGurd implements CanActivate, CanLoad {
    constructor(private auth: AuthService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const path = state.url;
        if (this.auth.authenticated && this.auth.is_client && this.auth.isRegister) {
            return true;
        } else {
            this.router.navigate(['/', 'sign-in'], { queryParams: { redirectTo: path } }).catch(err => {
                console.log(err);
            });
            return false;
        }

    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        const path = route.path;
        if (this.auth.authenticated) {
            return true;

        } else {
            this.router.navigate(['/', 'sign-in'], { queryParams: { redirectTo: path } }).catch(err => {
                console.log(err);
            });
            return false;
        }

    }
}
