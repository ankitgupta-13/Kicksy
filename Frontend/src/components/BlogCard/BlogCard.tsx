import style from './BlogCard.module.css'


const BlogCard = ({blog}) => {
  return (
    <div className={style.card}>
        <img src={blog.imageurl}  className={style.image} alt="Blog image"></img>
        <a>Games . {blog.createdAt}</a>
        <h3>{blog.blogTitle}</h3>
    </div>
  )
}

export default BlogCard