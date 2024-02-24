import { useState, useEffect } from 'react';
import style from './Blogs.module.css'
import BlogCard from '../../components/BlogCard/BlogCard';
import { getAllBlogs } from '../../api/user.api';


const Blog = () => {
  const [bloglist, setBloglist] = useState(
      [
        {
        id: 1,
      },
        {
        id: 2,
      },
        {
        id: 3,
      },
        {
        id: 4,
      },
        {
        id: 5,
      },
        {
        id: 6,
      },
  ]);

  const getBlogs = async () => {
    const response = await getAllBlogs();
    if (response.statusCode === 200) setBloglist(response.data);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  
  return (
    <div className={style.container}>
      <div className={style.topbar}>
   <span className={style.topbar__heading}>Blog</span>
   <span className={style.topbar__subheading}>Home - <span >All Posts</span></span>
      </div>
      <div className={style.bloglist}>
         {bloglist.map((blogs)=>(
          <BlogCard blog={blogs}/>
         ))}
      </div>
      <div className={style.recent_blogs}>
        <div className={style.recent_blogs_title}>Stay-up-to-date</div>
        <h2>RECENT POSTS</h2>
      </div>
    </div>
  )
}

export default Blog