import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from "@angular/router";
import { HttpService } from "../../modules/http-with-injector/http.service";
import { map, catchError } from "rxjs/operators";
import { UserAuthService } from "../user-auth/user-auth.service";
import { of, BehaviorSubject } from "rxjs";
export interface MerchantFilterConfig {
  reload?: boolean;
  query?: string;
}

export interface ModeSettings {
  reload: boolean;
  testMode?: boolean;
}
@Injectable({
  providedIn: "root"
})
export class UserDashboardResolveService implements Resolve<any> {
  private filterSubject: MerchantFilterConfig = { reload: false };
  filterConfig = new BehaviorSubject(this.filterSubject);
  private modeSub: ModeSettings = { reload: false };
  modeSettings = new BehaviorSubject(this.modeSub);
  constructor(private auth: UserAuthService, private http: HttpService) {}
  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log(router);
    if (router.routeConfig.path === "settings/payout-setup") {
      return this.getBanks();
    } else if (router.routeConfig.path === "transactions") {
      return this.getUserPayments();
    }
    if (router.routeConfig.path === "transactions/:id") {
      return this.getPaymentDetails(router.params.id);
    } else if (router.routeConfig.path === "profile") {
      return this.getUserInfo();
    } else {
      return this.getCurrentBalance();
    }
  }

  changeApi(data) {
    return this.http.post("users/add-url", data).toPromise();
  }

  generateKey() {
    return this.http.get("users/api-key").toPromise();
  }
  changeWalletInfo(data) {
    return this.http.post("users/change-wallet-info", data).toPromise();
  }

  getUserInfo() {
    return this.http
      .get("users/me")
      .toPromise()
      .then(res => {
        return res.result.data;
      })
      .catch(err => {
        return null;
      });
    // return this.http.get("users/me").toPromise();
  }
  getUrl() {
    return this.http.get("users/get-url").toPromise();
  }

  getUserPayments(query?) {
    const url = query ? `payments${query}` : "payments";
    return this.http.get(url).pipe(
      map(res => {
        return res.result;
      }),
      catchError(err => {
        return of([]);
      })
    );
  }
  getPayments() {
    return this.http.get("payments/all").pipe(
      map(res => {
        return res.result.data;
      }),
      catchError(er => {
        return of([]);
      })
    );
  }
  getBanks() {
    return this.http.get("users/bank-info").pipe(
      map(res => {
        return res.result.data;
      }),
      catchError(er => {
        return of([]);
      })
    );
  }
  getPayoutSchedule() {
    return this.http.get("users/payout").toPromise();
  }

  saveSchedule(data) {
    return this.http.post("users/payout", data).toPromise();
  }
  saveFrequency(data) {
    return this.http.post("users/transaction-period", data).toPromise();
  }
  getSchedule() {
    return this.http.get("users/payout").pipe(
      map(res => {
        return res.result.data;
      }),
      catchError(err => {
        return of(null);
      })
    );
  }
  getTransactionFrequency() {
    return this.http.get("users/transaction-period").pipe(
      map(res => {
        return res.result.data;
      }),
      catchError(err => {
        return of(null);
      })
    );
  }
  deleteBank(id) {
    return this.http.delete("users/bank-info/" + id).toPromise();
  }

  getPaymentDetails(id) {
    return this.http.get("payments/" + id).pipe(
      map(res => {
        return res.result.data;
      }),
      catchError(err => {
        return of(null);
      })
    );
  }

  getCurrentBalance() {
    return this.http
      .get("users/balance")
      .toPromise()
      .then(res => {
        return res.result.data;
      })
      .catch(err => {
        return null;
      });
  }

  deleteTicket(ticket_id) {
    return this.http.delete("support-tickets/" + ticket_id).toPromise();
  }

  setMode() {
    return this.http.get("users/toggle").toPromise();
  }
  getSupportTickes() {
    return this.http.get("support-tickets").pipe(
      map(res => {
        return res.result.data;
      }),
      catchError(err => {
        return of([]);
      })
    );
  }

  getTicketDetails(id) {
    return this.http.get("support-tickets/" + id).pipe(
      map(res => {
        return res.result.data;
      }),
      catchError(err => {
        return of(null);
      })
    );
  }

  addTicket(data) {
    return this.http.post("support-tickets", data).toPromise();
  }
  editTicket(ticket_id, data) {
    return this.http.post("support-tickets/" + ticket_id, data).toPromise();
  }
  addComments(data) {
    return this.http.post("support-tickets", data).toPromise();
  }
  deletComment(id) {
    return this.http.post("support-tickets", id).toPromise();
  }

  getComments() {
    return this.http.get("support-tickets").pipe(
      map(res => {
        return res.result.data;
      }),
      catchError(err => {
        return of([]);
      })
    );
  }
  getPayoutList(query) {
    const url = query ? `payouts${query}` : "payouts";
    return this.http.get(url).pipe(
      map(res => {
        return res.result;
      }),
      catchError(err => {
        return of(null);
      })
    );
  }
  getPayoutDetails(id) {
    return this.http.get("payouts/" + id).pipe(
      map(res => {
        return res.result.data;
      }),
      catchError(err => {
        return of(null);
      })
    );
  }
  exportTransactionsData(query) {
    return this.http.getBlob(`export-payments?${query}`);
  }
  downloadPayoutReport(id) {
    return this.http.getBlob("payouts/report/" + id);
  }
}
