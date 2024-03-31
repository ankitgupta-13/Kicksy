import { useState, useEffect } from 'react'
import { getBlogById } from '../../api/user.api'
import style from './BlogPage.module.css'
import { useLocation } from 'react-router-dom';
import PostCard from '../../components/PostCard/PostCard';

const BlogPage = () => {
  const [blog, setBlog] = useState([]);
  const createdDate = blog?.createdAt?.split("T")[0];
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("blog");

  const getCurrentBlog = async () => {
    const payload = {
      blogID: id,
    }
    const response = await getBlogById(payload);
    if (response.statusCode === 200) { setBlog(response.data); }
  }

  useEffect(() => {
    getCurrentBlog();
  }, []);

  // const renderStyledContent = () => {
  //   const words = blog?.content?.split(' ');
  //   const firstWord = words[0];

  //   const restOfContent = words.join(' ');

  //   return (
  //     <div>
  //       <span style={{ fontSize: '4rem', fontWeight: 900 }}>{firstWord}</span> {restOfContent}
  //     </div>
  //   );
  // };

  const renderStyledContent = () => {
    // Using regular expression to match the first word
    const match = blog?.content?.match(/\S+/);
    const firstWord = match ? match[0] : ''; // Extracting the first word

    const restOfContent = blog?.content?.replace(firstWord, ''); // Removing the first word from the content

    return (
      <div>
        <span style={{ fontSize: '4rem', fontWeight: 900 }}>{firstWord}</span> {restOfContent}
      </div>
    );
  };

  return (
    <div>
      <div className={style.topbar}>
        <span className={style.topbar__heading}>{blog.blogTitle}</span>
        {blog.category && <span className={style.topbar__subheading}>{blog.category} - <span >{createdDate}</span></span>}
      </div>
      <div className={style.blogsection}>
        <div className={style.BlogImgSection}>
          <img src={blog.imageurl} alt={blog.blogTitle} className={style.blogimage}></img>
        </div>

        <div className={style.blogcontent} style={{ whiteSpace: 'pre-wrap', fontFamily: 'Noir Pro' }}>
        {renderStyledContent()}
        </div>
      </div>
      <div className={style.recent_blogs}>
        <div className={style.recent_blogs_title} style={{
          fontSize: "1rem",

        }}>Stay-up-to-date</div>
        <h2 style={{
          marginTop: "0.7rem",
          fontSize: "2.5rem",
        }}>RECENT POSTS</h2>
        <div className={style.recent__blogs_container}>
          <PostCard />
        </div>
      </div>
    </div>
  )
}

export default BlogPage