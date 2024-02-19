import { useState } from 'react';
import style from './Blogs.module.css'


const Blog = () => {
  const [bloglist, setBloglist] = useState([]);
  
  return (
    <div>
      <div className={style.topbar}>
        Blog
      </div>
      <div>

      </div>
    </div>
  )
}

export default Blog