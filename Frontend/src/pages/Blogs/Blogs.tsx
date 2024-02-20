import { useState, useEffect } from 'react';
import style from './Blogs.module.css'
import BlogCard from '../../components/BlogCard/BlogCard';
import { getAllBlogs } from '../../api/user.api';


const Blog = () => {
  const [bloglist, setBloglist] = useState([]);

  const getBlogs = async () => {
    const response = await getAllBlogs();
    if (response.statusCode === 200) setBloglist(response.data);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  
  return (
    <div>
      <div className={style.topbar}>
        Blog
      </div>
      <div className={style.bloglist}>
        {bloglist.map((blog) =>{
          return (
          <BlogCard blog={blog}/>
          );
        })
        }
      </div>
      <div className={style.recent_blogs}>
        <label>Stay-up-to-date</label>
        <h2>RECENT POSTS</h2>
      </div>
    </div>
  )
}

export default Blog