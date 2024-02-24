import { useNavigate } from "react-router-dom";
import style from './BlogCard.module.css'


const BlogCard = ({blog}) => {
  const navigate = useNavigate();
  return (
    <div className={style.card} onClick={() => navigate(`/blogpage?blog=${blog._id}`)}
    >
        <img src={blog.imageurl}  className={style.image} alt="Blog image"></img>
        <a>Games . {blog.createdAt}</a>
        <h3>{blog.blogTitle}</h3>
    </div>
  )
}

export default BlogCard