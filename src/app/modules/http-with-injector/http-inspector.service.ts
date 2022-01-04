import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { CookieService } from 'ngx-cookie';
import { isPlatformBrowser } from '@angular/common';
import { UserData } from '../../globals/types';


@Injectable()
export class HttpInspectorService implements HttpInterceptor {

    constructor(@Inject(PLATFORM_ID) public platformId) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let current_user: any;
        // Clone the request to add the new header.
        if (isPlatformBrowser(this.platformId)) {
            current_user = JSON.parse(localStorage.getItem("currentUser")) as UserData;
        }
        if (current_user) {

            const authReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + current_user.token),
            });

            // send the newly created request
            return next.handle(authReq) as any;
        } else {

            // send the newly created request
            return next.handle(req) as any;
        }
    }



}
