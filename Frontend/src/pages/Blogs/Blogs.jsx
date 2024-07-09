import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "../../api/user.api.js";
import BlogCard from "../../components/BlogCard/BlogCard";
import style from "./Blogs.module.css";

const Blogs = () => {
  const { data: blogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await getAllBlogs();
      if (response.statusCode === 200) {
        return response.data;
      }
    },
    staleTime: Infinity,
  });

  return (
    <div className={style.container}>
      <div className={style.topbar}>
        <span className={style.topbar__heading}>Blog</span>
        <span className={style.topbar__subheading}>
          Home - <span>All Posts</span>
        </span>
      </div>
      <div className={style.bloglist}>
        {blogs?.map((blog) => (
          <BlogCard blog={blog} key={blog._id} />
        ))}
      </div>

      <div className={style.recent_blogs}>
        <div className={style.recent_blogs_top}>
          <div
            className={style.recent_blogs_title}
            style={{
              fontSize: "1rem",
            }}
          >
            Stay-up-to-date
          </div>
          <h2
            style={{
              marginTop: "0.7rem",
              fontSize: "2.5rem",
            }}
          >
            RECENT POSTS
          </h2>
        </div>

        {/* <div className={style.recent__blogs_container}>

                // This should be a separate component named Recent Blogs

          <PostCard />
          
        </div> */}
      </div>
    </div>
  );
};

export default Blogs;
