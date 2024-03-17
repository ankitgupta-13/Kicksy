import { useState, useEffect } from 'react'
import { getBlogById } from '../../api/user.api'
import style from './BlogPage.module.css'
import { useLocation } from 'react-router-dom';
import PostCard from '../../components/PostCard/PostCard';

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
        <div className={style.topbar}>
          <span className={style.topbar__heading}>{blog.blogTitle}</span>
          <span className={style.topbar__subheading}>Games - <span >{blog.createdAt}</span></span>
        </div>
        <div className={style.blogsection}>
        <img src={blog.imageurl} alt={blog.blogTitle} className={style.blogimage}></img>
        <p className={style.blogcontent}>{blog.content}</p>
        <div className={style.recent_blogs}>
              <div className={style.recent_blogs_title} style={{
                fontSize: "1rem",
              
              }}>Stay-up-to-date</div>
              <h2 style = {{
                marginTop: "0.7rem",
                fontSize: "2.5rem",
              }}>RECENT POSTS</h2>
          <div className={style.recent__blogs_container}>
            <PostCard/>
            </div>

          </div>
        </div>    
    </div>
  )
}

export default BlogPage