import { useState, useEffect } from 'react'
import { getBlogById } from '../../api/user.api'
import style from './BlogPage.module.css'
import { useLocation } from 'react-router-dom';

const BlogPage = () => {
    const [blog, setBlog] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("blog");

    const getCurrentBlog = async () => {
        const payload = {
          blogID : id,
        }
        const response = await getBlogById(payload);
        if (response.statusCode === 200)
        {setBlog(response.data);}
    }

    useEffect(() => {
        getCurrentBlog();
    }, []);

  return (
    <div>
        <div className={style.bloghead}>
        <h1 className={style.blogtitle}>{blog.blogTitle}</h1>
        <div className={style.blogsub}>
        <h4>Blog category</h4>
        <h4>{blog.createdAt}</h4>
        </div>
        </div>
        <div className={style.blogsection}>
        <img src={blog.imageurl} alt={blog.blogTitle} className={style.blogimage}></img>
        <p className={style.blogcontent}>{blog.content}</p>
        </div>    
    </div>
  )
}

export default BlogPage