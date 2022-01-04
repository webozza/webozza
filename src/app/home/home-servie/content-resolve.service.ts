import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { HttpService } from '../../modules/http-with-injector/http.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ContentResoveService implements Resolve<any> {
    constructor(private http: HttpService) {
    }
    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.http.get('/content').toPromise()
            .then(res => {
                if (!res.errors && res.data.length > 0) {
                    const content = {};
                    for (const c of res.data) {
                        content[c.tag] = c;
                    }
                    localStorage.setItem('contents', JSON.stringify(content));
                    return content;
                } else {
                    return {};
                }
            }).catch(err => console.log(err));
    }

  get   content() {
        return JSON.parse(localStorage.getItem('contents'));
    }
}
