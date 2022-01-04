import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class AdminGuardService implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.admin_authenticated) {
      this.router.navigate(["/auth/login"]).catch(err => {
        console.log(err);
      });
    }
    //  console.log(route.data , this.checkRole(route.data))
    if (route.data && this.checkRole(route.data) === false) {
      this.router.navigate(["/admin/dashboard"]).catch(err => {
        console.log(err);
      });
    }
    //  console.log('cal')
    return true;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // console.log(state.url);
    const urls = state.url.split("/");

    return true;
  }
  checkRole(data: any): boolean {
    const roles = this.auth.user_roles;
    let match = false;
    if (data && data.role) {
      if (data.role.indexOf(roles) >= 0) {
        match = true;
      }
    }
    //   console.log(match)
    return match;
  }
}
