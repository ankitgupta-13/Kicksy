import React from "react";

const PaymentButton = (props)=>{
    const {amount} = props;
    const checkOutHandler = async()=>{
        const rpay_key = await fetch("http://localhost:3000/api/user/payments/get-key" , {
            method:"get",
            headers:{
                "content-type":'application/json'
            }
        })
        const key = await rpay_key.json();
        console.log( key , amount);
        const data = await fetch("http://localhost:3000/api/user/payments/make-payment" , {
          method:"post",
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify({amount:amount})
        })

        const payment = await data.json();
        console.log(payment);
        
      }
    return ( <div>
        <button onClick={checkOutHandler}>payment</button>
    </div>
    );
}

export default PaymentButton;


// import React from 'react'

// const PaymentButton = () => {
//   return (
//     <div>PaymentButton</div>
//   )
// }

// export default PaymentButton