import React from "react";

const PaymentButton = (props)=>{
    const {amount} = props;
    const checkOutHandler = async()=>{
        const rpay_key = await fetch("https://fantastic-umbrella-xxv4xq9x994c977v-8005.app.github.dev/api/user/payments/get-key" , {
            method:"get",
            headers:{
                "content-type":'application/json'
            }
        })
        const key = await rpay_key.json();
        const data = await fetch("https://fantastic-umbrella-xxv4xq9x994c977v-8005.app.github.dev/api/user/payments/make-payment" , {
          method:"post",
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify({amount:amount})
        })

        const payment = await data.json();
        console.log(payment);
        const options = {
          key,
          amount,
          currency:"INR",
          name:"Charlie",
          description:"Razorpay tutorial",
          image:"",
          order_id:payment.data,
          callback_url:"https://fantastic-umbrella-xxv4xq9x994c977v-8005.app.github.dev/api/user/payments/verify-payment",
          prefill:{
            name:"Tanish Rastogi",
            email:"charliefernandis28@gmail.com",
            contact:"1234567890",
          },
          notes:{
            "address":"abcdefghijkl"
          },
          theme:{
            "color":"#3399cc"
          }

        }

        const razor = new window.Razorpay(options);

        razor.open();


        
      }
    return ( <div>
        <button onClick={checkOutHandler}>payment</button>
    </div>
    );
}

export default PaymentButton;


