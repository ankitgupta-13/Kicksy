import { useForm } from "react-hook-form";
import style from "./CreateProduct.module.css";

const CreateProduct = () => {
  const { register, handleSubmit } = useForm();
  const handleCreateProduct = (data: any) => {
    console.log(data);
  };

  return (
    <div className={style.container}>
      <h1>Create a new product</h1>
      <form onSubmit={handleSubmit(handleCreateProduct)}>
        <input
          type="text"
          placeholder="Product Name"
          {...register("productname")}
        />
        <input
          type="text"
          placeholder="Product Description"
          {...register("productdescription")}
        />
        <input
          type="text"
          placeholder="Product Price"
          {...register("productprice")}
        />
        <input
          type="text"
          placeholder="Product Image"
          {...register("productimage")}
        />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
