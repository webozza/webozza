import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../modules/http-with-injector/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-profile-account',
  templateUrl: './manage-profile-account.component.html',
  styleUrls: ['./manage-profile-account.component.css']
})
export class ManageProfileAccountComponent implements OnInit {
  profile: any = {};

  account_user;
  account;
  loaded = false;
  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.http.get("/user?invites=true").subscribe(response => {
      if(response.success) {
        this.loaded = true;
          this.profile = response.data;

          this.account = this.profile.account;
          this.account_user = this.profile.account_user;

          if(!this.profile.account && this.profile.account_with_invites) {
            this.account = this.profile.account_with_invites;
          }

          if(!this.profile.account_user && this.profile.account_user_with_invites) {
            this.account_user = this.profile.account_user_with_invites;
          }


            this.redirectIfNeeded();
      }
    });
  }

  redirectIfNeeded() {
    if(!this.account && !this.account_user)
    this.router.navigate(['/dashboard/profile/account/create']);

  }

  manageInvite(action: String) {
    if(this.account_user.status != "invited"){
      alert('You have already accepted this invite.');
      return;
    }
    this.http.post("/account/invite/"+this.account_user.id+"/manage", {action: action}).subscribe(response => {
      if(response.success) {
          alert(response.data);
          window.location.reload();
      } else {
        alert(response.errors);
      }
    });
  }
  
  leaveAccount() {
    if(this.account_user.is_owner){
      alert('You are the account owner and can not leave.');
      return;
    }

    this.http.delete("/account/user/"+this.account_user.id+"/delete").subscribe(response => {
      if(response.success) {
          alert(response.data);
          window.location.reload();
        } else {
          alert(response.errors);
        }
      });

  }

}
