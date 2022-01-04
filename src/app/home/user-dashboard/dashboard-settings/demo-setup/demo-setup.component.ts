import {Component, OnInit} from "@angular/core";
import {ScriptLoaderService} from "../../../../_services/script-loader.service";
import {Helpers} from "../../../../helpers";
import {UserDashboardResolveService} from "../../../home-servie/user-dashboard.service";
import {HttpService} from "../../../../modules/http-with-injector/http.service";
import {Router} from "@angular/router";

@Component({
    selector: "app-demo-setup",
    templateUrl: "./demo-setup.component.html",
    styleUrls: ["./demo-setup.component.css"]
})
export class DemoSetupComponent implements OnInit {
    copyIsSuccess;
    api_key: any;
    amount = 0.0001;
    error: boolean;
    success = false;
    errorMessage = "";
    widgetScript;
    widget_html;
    widget_html_button;

    constructor(private router: Router,
                private http: HttpService,
                private service: UserDashboardResolveService,
                private _script: ScriptLoaderService) {
        this.generateKey();
    }

    ngOnInit() {
    }

    generateKey() {
        Helpers.setLoading(true);
        this.service
            .generateKey()
            .then(res => {
                if (res.status === "OK") {
                    this.success = true;
                    this.api_key = res.result.data;
                    this.setScript();
                } else {
                    this.error = true;
                    this.errorMessage = res.result.error;
                }
            })
            .catch(err => {
                this.error = true;
                this.errorMessage = "something went wrong Please try again !! ";
            });
    }

    setScript() {
        this.widget_html = `<input type='hidden' id='coltpay_payment_box' value='{"amount": "1", "currency" : "USD" ,"webhook_url": "https://coltpay.com", "customer_info":[], "order_details":[]}'/>`;
        this.widget_html += '<div id="coltpay_checkout_container"></div>';
        this.widgetScript = `
    <script>
        var api_config = {
          success_url:"PUT_YOUR_SUCCESS_URL",
          cancel_url:"PUT_YOUR_CANCEL_URL",
         api_key:"${this.api_key}"
        };
    </script>
    <script src="http://api.coltpay.com/js/local/coltpay_widget.js"></script>
    `;


        this.widget_html_button = `<button id="coltpay_payment_button" value='{"amount": "8", "currency" : "USD" ,"type": "merchant_payment_button", "webhook_url": "https://coltpay.com", "customer_info":[], "order_details":[]}' >Pay By ColtPay</button>`;
        this.widget_html_button += '<div id="coltpay_checkout_container"></div>';

        Helpers.setLoading(false);
    }

    // submit() {
    //   this.router.navigateByUrl(
    //     `/new/payment?api_key=${this.api_key}&amount=${this.amount}`
    //   );
    // }

    copyToClipboard(type) {
        const aux = document.createElement("input");
        // Assign it the value of the specified element
        if (type === "html") {
            aux.setAttribute("value", this.widget_html); // Append it to the body
        }
        if (type === "script") {
            aux.setAttribute("value", this.widgetScript); // Append it to the body
        }

        document.body.appendChild(aux);
        aux.style.position = "absolute";
        aux.style.zIndex = "-999999";
        aux.select(); // Highlight its content
        document.execCommand("copy"); // Copy the highlighted text
        this.copyIsSuccess = true;
        setTimeout(() => {
            this.copyIsSuccess = false;
        }, 1500);
    }
}
