import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { CookieOptions, CookieService } from "ngx-cookie";
import { UserData } from "./auth.module";
import { isPlatformBrowser, Location } from "@angular/common";
import { HttpService } from "../http-with-injector/http.service";
import { Observable } from "rxjs";

export class AuthConfig {
  cookiePath: string;
  userKey?: string;
}

@Injectable()
export class AuthService implements CanActivate {
  cookieOptions: CookieOptions;

  constructor(
    private _cookies: CookieService,
    private router: Router,
    @Inject(PLATFORM_ID) public platform_id,
    private http: HttpService,
    private location: Location
  ) {
    this.cookieOptions = {
    };
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.data.auth) {
      const token = this.getToken();
      if (token) {
        return true;
      } else {
        this.navigateTo("login").then();
        return false;
      }
    }
    return true;
  }

  checkLogin(): Observable<boolean | any> {
    return new Observable(observer => {
      setInterval(() => {
        if (this.authenticated) {
          observer.next(this.authenticated);
        } else {
          observer.next(false);
        }
      }, 1000);
    });
  }

  get user() {
    return Observable.create(observer => {
      setTimeout(() => {
        return observer.next(this.userData);
      }, 1000);
    });
  }

  getCookie(name: string): any {
    let cookie;
    if (name && isPlatformBrowser(this.platform_id)) {
      cookie = this._cookies.getObject(name.trim());
    }
    if (cookie) {
      return cookie;
    } else {
      return false;
    }
  }

  setCookies(name: string, value: any) {
    localStorage.setItem(name.trim(), value);
    // this._cookies.putObject(name.trim(), value, this.cookieOptions);
  }

  removeCookie(name: string): void {
    localStorage.removeItem(name);
    this._cookies.remove(name, this.cookieOptions);
  }

  getToken(): string | boolean {
    const current_user = JSON.parse(localStorage.getItem("currentUser")) as UserData;
    if (current_user) {
      return current_user.token;
    }
    return false;
  }

  navigateTo(name: string): Promise<any> {
    const promise = this.router.navigate([name]);
    return promise;
  }

  roles() {
    const cookie: any = this.getCookie("currentUser");
    const roles = cookie.role;
    return roles;
  }

  matchRole(name: string): boolean {
    return this.roles() === name ? true : false;
  }

  removeUser() {
    this.removeCookie("currentUser");
  }

  logout() {
    // return this.http.get('users/logout')
    //     .toPromise();
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve({ status: "OK" });
      }, 300);
    });
  }

  private eliminateUser() {
    const path = this.location.path();
    this.removeCookie("currentUser");
    if (path) {
      this.logout()
        .then(() => {
          this.router
            .navigate(["/", "login"], { queryParams: { redirectTo: path } })
            .catch(err => {});
        })
        .catch(() => {
          this.router
            .navigate(["/", "login"], { queryParams: { redirectTo: path } })
            .catch(err => {});
        });
      this.router
        .navigate(["/", "login"], { queryParams: { redirectTo: path } })
        .catch(err => {});
    }
  }

  private updateRemember(data) {
    const date = new Date(data.remember_time);
    date.setSeconds(date.getSeconds() + 1);
    data.remember_time = date;
    this.setCookies("currentUser", data);
  }

  get userData(): UserData {
    const data = this.getCookie("currentUser");
    return data;
  }

  get isRegister(): boolean {
    const user_data: UserData = this.getCookie("currentUser");
    if (user_data.status === 1) {
      return true;
    } else {
      return false;
    }
  }

  get authenticated(): boolean {
    const user_data = JSON.parse(localStorage.getItem("currentUser")) as UserData;
      
      return user_data && user_data.id != null;
  }

  get admin_authenticated(){
    const user_data = this.getCookie("currentUser");
    return user_data;
  }
  get is_admin(): boolean {
    return this.matchRole("admin");
  }
  get is_saleRep(): boolean {
    return this.matchRole("sales_representative");
  }


  get is_client(): boolean {
    return this.matchRole("client");
  }

  get user_roles(): string[] {
    return this.roles();
  }

  set Avatar(src: string) {
    const user_data = this.userData;
    if (user_data) {
      user_data.avatar = src;
      this.setCookies("currentUser", user_data);
    }
  }

  get Avatar() {
    const user_data = this.userData;
    return user_data ? user_data.avatar : null;
  }

  set userData(userData: UserData) {
    this.setCookies("currentUser", userData);
  }

  setLoginData(userData: any) {
    if (userData && userData.id) {
      this.setCookies("currentUser", JSON.stringify(userData));
    }
  }

  get trained() {
    if (this.authenticated) {
      const trained = this.getCookie(this.userData.user_id + "");
      return trained && trained.training;
    } else {
      return false;
    }
  }
}
