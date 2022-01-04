import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { HttpService } from '../../modules/http-with-injector/http.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CheckoutResolveService implements Resolve<any> {
    constructor(
        private router: Router,
        private http: HttpService) {
    }
    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const code = router.params.code;
        return this.http.get('customer/checkout/' + code).toPromise()
            .then(res => {
                if (res.status === 'OK') {
                    return res.result.data.invoice;
                } else {
                    this.router.navigate(['']);
                }
            }).catch(err => console.log(err));
    }


}
