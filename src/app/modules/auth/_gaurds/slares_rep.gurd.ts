import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class SalesRepGuard implements CanActivate, CanLoad {
    constructor(private auth: AuthService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            if(!this.auth.authenticated){
                this.router.navigate(['/auth/login']).catch(err => {
                    console.log(err);
                });
            }
            if(!this.auth.is_saleRep){
                this.router.navigate(['/admin/dashboard']).catch(err => {
                    console.log(err);
                });
            }
      return  true;
    }
    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        if(!this.auth.authenticated){
            this.router.navigate(['/auth/login']).catch(err => {
                console.log(err);
            });
        }
        if(!this.auth.is_saleRep){
            this.router.navigate(['/admin/dashboard']).catch(err => {
                console.log(err);
            });
        }
        return true;
    }
}
