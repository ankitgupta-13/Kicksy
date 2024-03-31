import { useNavigate } from "react-router-dom";
import style from './BlogCard.module.css'

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const createdDate = blog?.createdAt?.split("T")[0];
  return (
    <div className={style.card} onClick={() => navigate(`/blogpage?blog=${blog._id}`)}>
      <div className={style.image} style={{backgroundImage: `url(${blog.imageurl})`}}></div>
      <div className={style.card__info}>
        <a>{blog.category}</a>
        <span className={style.card__info_entity}>&#9679;</span>
        <span className={style.card__info_date}>{createdDate}</span>
      </div>
      <p className={style.card__paragraph}>{blog.blogTitle}</p>
    </div>
  )
}

export default BlogCard