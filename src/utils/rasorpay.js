import {couponData} from '../types/user'
export function doPaymentWithRazorpay(order) {
    return new Promise((resolve, reject) => {

        var options = {
            "key": "rzp_test_oSkqcdZLf0wgQE", // Enter the Key ID generated from the Dashboard
            "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "H CR",
            "description": "Hospital AR C",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQiNdTZG4FfnoT0tHtTh5FaDlYi2_tmmDaxs9Cd-Wt&s",
            "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
            "handler": function (response) {
                resolve(response);
            },
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9999999999"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    })
}

