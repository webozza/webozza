import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from "@angular/router";
import { HttpService } from "../../modules/http-with-injector/http.service";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs/internal/observable/of";

@Injectable()
export class PageResolveService implements Resolve<any> {
  constructor(private http: HttpService) {}
  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (router.routeConfig.path === "faq") {
      return this.getFaqs();
    }
  }

  getFaqs() {
    return this.http.get("/content/faq").pipe(
      map(res => {
        return res.data;
      }),
      catchError(err => {
        return of([]);
      })
    );
  }
}
