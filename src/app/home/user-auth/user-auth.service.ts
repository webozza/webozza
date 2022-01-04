import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "../../modules/http-with-injector/http.service";
import { AuthService } from "../../modules/auth/auth.service";

import { catchError, debounceTime, map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { UserData } from "../../modules/auth/auth.module";

export interface UserSettings {
  email?: string;
  reload?: boolean;
  message?: string;
}
@Injectable({
  providedIn: "root"
})
export class UserAuthService {
  private sub: UserSettings = { reload: false, email: "" };
  userSettings = new BehaviorSubject(this.sub);
  constructor(
    private http: HttpService,
    private auth: AuthService,
    private router: Router
  ) {}

  login(data: any): Promise<any> {
    return this.http.post("/auth/login", data).toPromise();
  }

  addCookies(name: string, value: any) {
    return this.auth.setCookies(name, value);
  }

  forgetPassword(data) {
    return this.http.post("/auth/forgot-password", data).toPromise();
  }

  register(data) {
    return this.http.post("/auth/register", data).toPromise();
  }

  completeRegistration(data) {
    return this.http.post("users/me", data).toPromise();
  }
  resetPassword(data) {
    return this.http.post("auth/reset-password", data).toPromise();
  }

  changeState() {
    return this.http.get("auth/change-state").toPromise();
  }
  activateAccount(code) {
    return this.http.post("auth/activate-user", code).toPromise();
  }

  sendActivationCode(email) {
    return this.http.post("auth/resend-email-activation", email).toPromise();
  }

  updateUser(data) {
    return this.http.post("users/me", data).toPromise();
  }

  getUserInfo() {
    return this.http.get("users/me").pipe(
      map(res => {
        if (res.status === "OK") {
          return res.result.data;
        }
        return null;
      })
    );
  }

  changePassword(data) {
    return this.http.post("auth/change-password", data).toPromise();
  }

  getAvatar() {
    const userData: UserData = this.user;
    return userData.avatar;
  }

  checkEmailNotTaken(email: string) {
    return this.http.post("auth/email-check", { email: email }).pipe(
      debounceTime(1000),
      catchError(() => {
        return { result: { message: false } } as any;
      }),
      map(res => {
        return res.result.message ? { emailTaken: true } : null;
      })
    );
  }

  setLogin(userData: any) {
    this.auth.setLoginData(userData);
  }

  get user() {
    return this.auth.userData;
  }

  logout() {
    return this.auth.removeUser();
  }
}
