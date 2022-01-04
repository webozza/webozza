let ws_protocol = "ws";
let ws_hostname = "localhost";
let ws_port = "9696";
let sending_address = "";
let invoice_code = null;
let amount = null;
let redirectURL = null;

function connect() {
  return new WebSocket(ws_protocol + "://" + ws_hostname + ":" + ws_port);
}

function initiate(send_address, invoice_code, amount_btc, redirect_url) {
    console.log('call')
  sending_address = send_address;
  invoice_code = invoice_code;
  amount = amount_btc;
  redirectURL = redirect_url;
  return true;
}



function call(send_address, invoice_code, amount_btc, redirect_url){
    try {
        socket = connect();
        //call initiate function
        //example --
        initiate(send_address, invoice_code, amount_btc, redirect_url);
        socket.onopen = function(event) {
          console.log("connected");
          socket.onmessage = function(event) {
            let data = event.data ? JSON.parse(event.data) : null;
            console.log(data)
            let address = data.address;
            let code = data.invoice;
            if (sending_address == address && invoice_code==code) {
              // remove qr code
              // place Paid text on that
              // redirect to client provided url
              console.log("Payment Successful");
             // window.location.replace(redirectURL);
            }
            //console.log('Client received a message', data);
          };
      
          socket.onclose = function(event) {
            console.log("Connection closed");
          };
        };
      } catch (exception) {
        console.error(exception);
      }
      
}