import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { HttpService } from '../../modules/http-with-injector/http.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WidgetResolveService implements Resolve<any> {
    constructor(private http: HttpService) {
    }
    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // return null;
    }


}
