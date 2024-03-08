import { useForm } from "react-hook-form";
import style from "./AddBlog.module.css";
import { addBlog } from "../../../../../api/admin.api";
import { Input } from "../../../../../components";

const AddBlog = () => {
  const { register, handleSubmit } = useForm();

  const handleAddBlog = async (data: any) => {
    const { content, blogTitle, image } = data;
    const formData = new FormData();
    formData.append("content", content);
    formData.append("blogTitle", blogTitle);
    formData.append("image", image[0]);
    try {
      const response = await addBlog(formData);
      return response;
    } catch (error) {
      console.error("Error calling addBlog API:", error);
      throw error;
    }
  };

  return (
    <div className={style.addblog}>
      <h2>Add Blog</h2>
      <form onSubmit={handleSubmit(handleAddBlog)}>
        <div className={style.blogtitle}>
          <Input
            label="Blog Title"
            type="text"
            placeholder="Blog Title"
            {...register("blogTitle", { required: "Blog title is required" })}
          />
        </div>
        <div className={style.content}>
          <Input
            label="Content"
            type="text"
            placeholder="Blog Content"
            style={{ height: "250px" }}
            {...register("content", { required: "Content is required" })}
          />
        </div>
        <div className={style.image}>
          <Input
            label="Blog Image"
            type="file"
            single
            {...register("image", { required: true })}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBlog;
