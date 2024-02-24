import style from './BlogCard.module.css'
import DummyImage from '../../assets/dummy_blog_image.png'
const BlogCard = ({blog: any}) => {
  return (
    <div className={style.card}>
        <img src={DummyImage}  className={style.image} alt="Blog image"/>
        <div className={style.card__info}>
             <a>Games</a>
             <span className={style.card__info_entity}>&#9679;</span>
             <span className={style.card__info_date}>Feb 18, 2020</span>
             </div>
        <p className={style.card__paragraph}>Lorem ipsum dolor sit amet consectetur.</p>
     
        {/* <h3>{blog.blogTitle}</h3> */}
    </div>
  )
}

export default BlogCard