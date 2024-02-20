import { useState } from 'react';
import style from './Blogs.module.css'
import BlogCard from '../../components/BlogCard/BlogCard';


const Blog = () => {
  const [bloglist, setBloglist] = useState([]);

  return (
    <div>
      <div className={style.topbar}>
        Blog
      </div>
      <div className={style.bloglist}>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
      </div>
      <div className={style.recent_blogs}>
        <label>Stay-up-to-date</label>
        <h2>RECENT POSTS</h2>
      </div>
    </div>
  )
}

export default Blog