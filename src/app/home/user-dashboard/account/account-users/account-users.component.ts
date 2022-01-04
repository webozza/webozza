import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../modules/http-with-injector/http.service';

@Component({
  selector: 'app-account-users',
  templateUrl: './account-users.component.html',
  styleUrls: ['./account-users.component.css']
})
export class AccountUsersComponent implements OnInit {

  users: any = [];
  constructor(    private http: HttpService    ) { }

  ngOnInit() {
    this.http.get("/account").subscribe(response => {
      if(response.success) {
          this.users = response.data.users;
      }
    });

  }

  removeUser(id: String) {
    this.http.delete("/account/user/"+id+"/delete").subscribe(response => {
      if(response.success) {
          alert(response.data);
          window.location.reload();
        } else {
          alert(response.errors);
        }
      });
  }

  addUser() {
    var user = prompt("Please enter the email address for the user you'd like to add:");
    if(user) {
      this.http.post("/account/user/add", {email: user}).subscribe(response => {
        if(response.success) {
            alert(response.data);
            window.location.reload();
          } else {
            alert(response.errors);
          }
        });
      }
  }

}
