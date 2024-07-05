import { useEffect, useState } from "react";
import { getAllBlogs } from "../../../../../api/admin.api";
import BlogCard from "../../../../../components/BlogCard/BlogCard";
import style from "./ListBlogs.module.css";

const ListBlogs = () => {
  const [bloglist, setBloglist] = useState([]);
  const getBlogs = async () => {
    const response = await getAllBlogs();
    if (response.statusCode === 200) setBloglist(response.data);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className={style.list}>
      {bloglist.map((blog) => {
        return <BlogCard blog={blog} />;
      })}
    </div>
  );
};

export default ListBlogs;
