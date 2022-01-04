import { Component, OnInit } from '@angular/core';
import { HttpService } from '../modules/http-with-injector/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.css']
})
export class ValidateEmailComponent implements OnInit {

  id;
  token;
  constructor(private http: HttpService, 
    private router: Router,
    private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.token = params['token'];

      this.validate();
  });


  }

  ngOnInit() {

  }

  validate() {

    this.http.post("/user/validate-email/"+this.id, {
      token: this.token,
    }).subscribe(response => {
      if(response.success) {
          alert('Your email has been verified.');
          this.router.navigate(['/dashboard/profile/account/create']);
      } else {
        alert(response.errors);
        this.router.navigate(['/dashboard']);
        return;
      }
    });

  }

}
