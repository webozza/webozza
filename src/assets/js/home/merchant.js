function CallApi() {
    console.log('c')
    fetch(`http://coltpay.local/api/payment?api_key=${api_key}&amount_btc=${amount}`).then(res => res.json())
        .then(resp => {
            if (resp.status === 'OK') {
                $(location).attr('href', `http://localhost:4200/new/payment?api_key=${api_key}&amount=${amount}`)
            } else {
                alert(resp.result.message)
            }
        })
        .catch(err => {
            alert('Invalid Request ')
        })
}
CallApi();