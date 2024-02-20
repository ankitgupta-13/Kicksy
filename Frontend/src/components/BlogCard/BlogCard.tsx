import style from './BlogCard.module.css'
import adidas from '../../assets/adidas.png'


const BlogCard = ({blog}) => {
  return (
    <div className={style.card}>
        <img src={adidas}  className={style.image} alt="Blog image"></img>
        <a>Games . Date</a>
        <h3>Hii this is new blog</h3>
    </div>
  )
}

export default BlogCard