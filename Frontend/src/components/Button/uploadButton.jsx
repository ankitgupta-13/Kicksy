import React from "react";

const UploadButton = async(props)=>{
    const {folderName} = props;

    const data = await fetch("http://localhost:8005/api/admin/add-blog" , {
        method:"post",
        headers:{
            "content-type":'application/json'
        },
        body:JSON.stringify({
            blogTitle:"test blog",
            content:"this is a test blog"
        })
    })

    const obj = await data.json();

    return <div>
        <button>upload button</button>
    </div>

}

export default UploadButton;