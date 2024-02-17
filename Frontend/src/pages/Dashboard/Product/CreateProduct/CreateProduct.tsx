import { useForm } from "react-hook-form";
import style from "./CreateProduct.module.css";
import { Button, Input, Select } from "../../../../components";
import { addProduct, uploadImage } from "../../../../api/admin.api";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleCreateProduct = async (data: any) => {
    const { images } = data;
    const imageUrls = [];
    for (const image of images) {
      const formData = new FormData();
      formData.append("image", image);
      const response = await uploadImage(formData);
      if (response.statusCode !== 200) return console.log(response.message);
      imageUrls.push(response.data);
    }
    data = { ...data, images: imageUrls };
    const response = await addProduct(data);
    if (response.statusCode === 200) {
      alert(response.message);
      navigate("/");
    } else alert(response.message);
  };

  return (
    <div className={style.container}>
      <h1>Create a new product</h1>
      <h1>Details</h1>
      <form onSubmit={handleSubmit(handleCreateProduct)} className={style.form}>
        <div className={style.sub}>
          <Input
            label="Product Name"
            type="text"
            placeholder="Product Name"
            {...register("title", { required: true })}
          />
          <Input
            label="Description"
            type="text"
            placeholder="Product Description"
            {...register("description", { required: true })}
          />
          <Input
            label="Images"
            type="file"
            multiple
            {...register("images", { required: true })}
          />

          <h1>Properties</h1>
          <Input
            type="text"
            placeholder="Product Code"
            {...register("productCode", { required: true })}
          />
          <Input
            type="number"
            placeholder="Quantity"
            {...register("stock", { required: true })}
          />
        </div>
        <div className={style.sub}>
          <Select
            label="Category"
            options={["Category 1", "Category 2"]}
            {...register("category", { required: true })}
          />
          <Select
            label="Size"
            options={["S", "M", "L", "XL", "XXL"]}
            {...register("size", { required: true })}
          />
          <Select
            label="Brand"
            options={["Adidas", "Nike", "Puma", "Reebok", "Fila"]}
            {...register("brand", { required: true })}
          />
          <Select
            label="Color"
            options={["Red", "Blue", "Cyan", "Green"]}
            {...register("color", { required: true })}
          />

          <label>Gender</label>
          <input
            type="radio"
            value="M"
            id="M"
            {...register("gender", { required: true })}
          />
          <label htmlFor="M">Men</label>
          <input
            type="radio"
            value="F"
            id="F"
            {...register("gender", { required: true })}
          />
          <label htmlFor="F">Women</label>

          <input
            type="radio"
            value="K"
            id="K"
            {...register("gender", { required: true })}
          />
          <label htmlFor="K">Kids</label>
          <h1>Price</h1>
          <Input
            type="number"
            label="Product Price"
            placeholder="Product Price"
            {...register("price", { required: true })}
          />
          <Button type="submit">Create Product</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
