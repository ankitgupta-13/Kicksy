import React, { useState } from "react";
import Button from "./Button";
import axios from "axios";

// const awsUploadFunction = async(body , image)=>{

//     // body can contain blogTitle , location , content

//     const data = await fetch("http://localhost:8005/api/admin/add-blog" , {
//         method:"post",
//         headers:{
//             "content-type":'application/json'
//         },
//         body:JSON.stringify(body)
//     });

//     const url = await data.json();

//     const formData = new FormData();
//     formData.append('blog-image' , image);

//     const upload = await fetch(data , {
//         method:"put",
//         body:formData
//     })

//     if(upload){

//     }
// }

const BlogUploadButton = (props) => {
  const [image, setImage] = useState("");

  const awsUploadFunction = async (image) => {
    // body can contain blogTitle , location , content
    const data = await fetch("http://localhost:3000/api/admin/add-blog", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        blogTitle: "test blog",
        content: "test content",
      }),
    });

    const url = await data.json();
    console.log(url);

    const upload = await axios.put(url.data , image)

    if (upload) {
      // alert("uploaded successfully");
    }
  };
  const formData = new FormData();
  formData.append("blog-image", image);

  return (
    <div>
      <input type="text"></input>
      <input
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <Button
        onClick={() => {
          console.log("123");
          awsUploadFunction(image);
        }}
      >
        upload image to aws
      </Button>
    </div>
  );
};

export default BlogUploadButton;
