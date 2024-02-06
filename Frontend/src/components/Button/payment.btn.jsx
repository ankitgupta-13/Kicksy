import React from "react";

const Rpay_buy_btn = async(props)=>{
    const {amount} = props
    const checkOutHandler = async()=>{
        const data = await fetch("http://localhost:8005/api/user/payments/getKey" , {
            method:"get",
            headers:{
                contentType:'application/json'
            }
        })
        const key = await data.json();
        console.log(key);
    }
    return <div>
        <button onClick={checkOutHandler}></button>
    </div>
}

export default Rpay_buy_btn;