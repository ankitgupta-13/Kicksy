import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import { getProductById } from "../../../../../api/product.api";
import { useForm } from "react-hook-form";
import style from "./EditProduct.module.css";
import {
  Button,
  Container,
  ImageSlider,
  Input,
  Select,
} from "../../../../../components";
import { updateProduct } from "../../../../../api/admin.api";

const EditProduct = () => {
  const productID = useSelector(
    (state: RootState) => state.adminDashboard.currentProduct
  );
  const [product, setProduct] = useState({});
  const [imageUrls, setImageUrls] = useState([]);
  // const { register, handleSubmit, watch } = useForm();
  const [productPrice, setProductPrice] = useState();

  const handleUpdateProduct = (data) => {
    try {
      data = { ...data };
      const response = updateProduct({ data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getProductById({ productID });
        setProduct(response.data);
        setImageUrls(response.data.images[0]);
        setProductPrice(response.data.price.originalPrice);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSave = () => {
    handleUpdateProduct(product);
  };

  return (
    <div>
      {product ? (
        // <form
        //   onSubmit={handleSubmit(handleUpdateProduct)}
        //   className={style.form}
        // >
        //   <div className={style.section}>
        //     <h1>Details</h1>
        //     <div className={style.sub}>
        //       <Input
        //         label="Product Name"
        //         type="text"
        //         defaultValue={product.title}
        //         placeholder="Product Name"
        //         {...register("title", { required: true })}
        //       />
        //       <Input
        //         label="Description"
        //         type="text"
        //         defaultValue={product.description}
        //         placeholder="Product Description"
        //         {...register("description", { required: true })}
        //       />
        //       <Input
        //         label="Images"
        //         type="file"
        //         multiple
        //         {...register("images", { required: true })}
        //       />
        //     </div>
        //   </div>
        //   <div className={style.section}>
        //     <h1>Properties</h1>
        //     <div className={style.sub}>
        //       <Input
        //         label="Product Code"
        //         type="text"
        //         defaultValue={product.productCode}
        //         placeholder="Product Code"
        //         {...register("productCode", { required: true })}
        //       />
        //       <Input
        //         label="Quantity"
        //         type="number"
        //         defaultValue={product.stock}
        //         placeholder="Quantity"
        //         {...register("stock", { required: true })}
        //       />

        //       <Select
        //         label="Category"
        //         options={["Category 1", "Category 2"]}
        //         {...register("category", { required: true })}
        //       />
        //       <Select
        //         label="Size"
        //         options={["S", "M", "L", "XL", "XXL"]}
        //         {...register("size", { required: true })}
        //       />
        //       <Select
        //         label="Brand"
        //         options={["Adidas", "Nike", "Puma", "Reebok", "Fila"]}
        //         {...register("brand", { required: true })}
        //       />
        //       <Select
        //         label="Color"
        //         options={["Red", "Blue", "Cyan", "Green"]}
        //         {...register("color", { required: true })}
        //       />
        //       <label>Gender</label>
        //       <input
        //         type="radio"
        //         value="M"
        //         id="M"
        //         {...register("gender", { required: true })}
        //       />
        //       <label htmlFor="M">Men</label>
        //       <input
        //         type="radio"
        //         value="F"
        //         id="F"
        //         {...register("gender", { required: true })}
        //       />
        //       <label htmlFor="F">Women</label>

        //       <input
        //         type="radio"
        //         value="K"
        //         id="K"
        //         {...register("gender", { required: true })}
        //       />
        //       <label htmlFor="K">Kids</label>
        //     </div>
        //   </div>
        //   <div className={style.section}>
        //     <Input
        //       type="number"
        //       label="Product Price"
        //       placeholder="Product Price"
        //       defaultValue={productPrice}
        //       {...register("originalPrice", { required: true })}
        //     />
        //   </div>
        //   <Button type="submit">Create Product</Button>
        // </form>

        <Container
          sx={{
            flexDirection: "row",
            padding: "20px",
            gap: "2rem",
          }}
        >
          <ImageSlider imageUrls={imageUrls} />
          <div className={style.productDetails}>
            <span className={style.heading}>Product Details</span>
            <div className={style.form}>
              <label className={style.label}>Title</label>
              <div className={style.outerdiv}>
                <input
                  className={style.input}
                  type="text"
                  name="title"
                  value={product.title || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className={style.label}>Description</label>
                <div className={style.outerdiv}>
                  <input
                    className={style.input}
                    style={{ height: "130px" }}
                    type="text"
                    name="description"
                    value={product.description || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className={style.label}>Brand</label>
                <div className={style.outerdiv}>
                  <input
                    className={style.input}
                    type="text"
                    name="brand"
                    value={product.brand || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className={style.label}>Color</label>
                <div className={style.outerdiv}>
                  <input
                    className={style.input}
                    type="text"
                    name="color"
                    value={product.color || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className={style.label}>Sizes</label>
                <div className={style.outerdiv}>
                  <input
                    className={style.input}
                    type="text"
                    name="size"
                    value={product.size || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className={style.label}>Gender</label>
                <div className={style.outerdiv}>
                  <input
                    className={style.input}
                    type="text"
                    name="gender"
                    value={product.gender || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className={style.label}>Category</label>
                <div className={style.outerdiv}>
                  <input
                    className={style.input}
                    type="text"
                    name="category"
                    value={product.category || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={style.buttoncontainer}>
                <Button onClick={handleSave} className={style.savebutton}>Save</Button>
              </div>
            </div>
          </div>
        </Container>
      ) : (
        <h1>"No product selected"</h1>
      )}
    </div>
  );
};

export default EditProduct;
