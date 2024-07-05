import React, { useEffect, useState } from "react";
import style from "./PostCard.module.css";

import { useNavigate } from "react-router-dom";
import { getAllBlogs } from "../../api/user.api";

const PostCard = (props) => {
  const [bloglist, setBloglist] = useState([]);
  const navigate = useNavigate();

  const getBlogs = async () => {
    const response = await getAllBlogs();
    if (response.statusCode === 200) setBloglist(response.data.slice(-4));
  };

  useEffect(() => {
    getBlogs();
  }, []);

  function getMonthName(monthNumber) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[monthNumber];
  }

  const createdDate = bloglist[bloglist.length - 1]?.createdAt?.split("T")[0];
  const createdMonth = createdDate?.split("-")[1];
  const createdDay = createdDate?.split("-")[2];

  return (
    <div className={style.container}>
      <div
        className={style.header}
        style={{ cursor: "pointer" }}
        onClick={() =>
          navigate(`/blogpage?blog=${bloglist[bloglist.length - 1]?._id}`)
        }
      >
        <img
          src={bloglist[bloglist.length - 1]?.imageurl}
          className={style.container__header_image}
        />
        <div className={style.header__info}>
          <div className={style.header__date}>
            {" "}
            <div>{createdDay}</div>{" "}
            <div className={style.header__month}>
              {getMonthName(parseInt(createdMonth))}
            </div>{" "}
          </div>
          <div className={style.header__container}>
            <div className={style.header__content}>
              {bloglist[bloglist.length - 1]?.blogTitle}
            </div>
            <div className={style.header__paragraph}>
              {bloglist[bloglist.length - 1]?.content}
            </div>
            {/* <div className={style.header__likes}>0 Likes . 0 Comments</div> */}
          </div>
        </div>
      </div>
      <div className={style.container__block}>
        {bloglist
          .slice(0, -1)
          .slice(-3)
          .map((blog) => (
            <BlockCard blog={blog} />
          ))}
      </div>
    </div>
  );
};

const BlockCard = ({ blog }) => {
  const createdDate = blog?.createdAt?.split("T")[0];
  const navigate = useNavigate();
  return (
    <div
      className={style.block}
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/blogpage?blog=${blog._id}`)}
    >
      <img src={blog.imageurl} alt="error" className={style.block__image} />
      <div className={style.block__info}>
        <div className={style.block__info_heading}>
          {blog.category}{" "}
          <span className={style.block__info_circle}>&#9679;</span>{" "}
          <span className={style.block__info_date}>{createdDate}</span>
        </div>
        <div className={style.block__info_content}>{blog.blogTitle}</div>
      </div>
    </div>
  );
};
export default PostCard;
