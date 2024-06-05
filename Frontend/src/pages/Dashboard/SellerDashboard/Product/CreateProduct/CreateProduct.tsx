import { useForm } from "react-hook-form";
import style from "./CreateProduct.module.css";
import { Button, Container, Input, Select } from "../../../../../components";
import {
  addProductRequest,
  uploadProductRequestImage,
} from "../../../../../api/seller.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const CreateProduct = () => {
  const { register, handleSubmit, watch } = useForm();
  const userID = useSelector((state: RootState) => state.auth.userData._id);
  const productID = uuid().slice(0, 8).toUpperCase();

  const handleCreateProduct = async (data: any) => {
    // console.log(watch(data.gender[0]));
    const { images } = data;
    const imageUrls = [];
    for (const image of images) {
      const formData = new FormData();
      formData.append("image", image);
      const response = await uploadProductRequestImage(formData);
      if (response.statusCode !== 200) return console.log(response.message);
      imageUrls.push(response.data);
    }
    data = { ...data, images: imageUrls, userID: userID };
    console.log(data);
    const response = await addProductRequest(data);
    if (response.statusCode === 200) {
      alert(response.message);
    } else alert(response.message);
  };

  return (
    <Container>
      <h1 className={style.containerHeading}>Create a new product</h1>
      <form onSubmit={handleSubmit(handleCreateProduct)} className={style.form}>
        <div className={style.section}>
          <div className={style.SectionContainer}>
            <h1 className={style.sectionContainerHeading}>Details</h1>
          </div>

          <div className={style.sub}>
            <div className={style.inputBox}>
              <Input
                style={{
                  marginTop: "5px",
                  border: "none",
                  borderBottom: "1px solid var(--Border-2, #CCC)",
                  backgroundColor: "rgb(249, 249, 249)",
                }}
                label="Product Name"
                type="text"
                placeholder="Product Name"
                {...register("title", { required: true })}
              />
            </div>
            <div className={style.inputBox}>
              <Input
                style={{
                  marginTop: "5px",
                  border: "none",
                  borderBottom: "1px solid var(--Border-2, #CCC)",
                  backgroundColor: "rgb(249, 249, 249)",
                }}
                label="Description"
                type="text"
                placeholder="Product Description"
                {...register("description", { required: true })}
              />
            </div>
            <div className={style.inputBox}>
              <Input
                style={{
                  marginTop: "5px",
                  border: "none",
                  borderBottom: "1px solid var(--Border-2, #CCC)",
                  backgroundColor: "rgb(249, 249, 249)",
                }}
                label="Images"
                type="file"
                multiple
                {...register("images", { required: true })}
              />
            </div>
          </div>
        </div>
        <div className={style.section}>
          <div className={style.SectionContainer}>
            <h1 className={style.sectionContainerHeading}>Properties</h1>
          </div>

          <div className={style.sub}>
            <div className={style.inputBox}>
              <label>Product Code</label>
              <input
                type="text"
                // value={productID}
                disabled
                defaultValue={productID}
                {...register("skuID", { required: true })}
              />
            </div>
            <div className={style.inputBox}>
              <Input
                style={{
                  marginTop: "5px",
                  border: "none",
                  borderBottom: "1px solid var(--Border-2, #CCC)",
                  backgroundColor: "rgb(249, 249, 249)",
                }}
                label="Quantity"
                type="number"
                placeholder="Quantity"
                {...register("stock", { required: true })}
              />
            </div>

            <div className={style.inputBox}>
              <Select
                label="Category"
                options={["boots", "sneakers"]}
                {...register("category", { required: true })}
              />
            </div>
            <div className={style.inputBox}>
              <Input
                type="checkbox"
                value={6}
                label="6"
                ss={{display: "flex", alignItems: "center", maxWidth: "25%", justifyContent: "space-around"}}
                {...register("size", { required: true })}
              />
              <Input
                type="checkbox"
                value={7}
                label="7"
                ss={{display: "flex", alignItems: "center", maxWidth: "25%", justifyContent: "space-around"}}
                {...register("size", { required: true })}
              />
              <Input
                type="checkbox"
                value={8}
                label="8"
                ss={{display: "flex", alignItems: "center", maxWidth: "25%", justifyContent: "space-around"}}
                {...register("size", { required: true })}
              />
              <Input
                type="checkbox"
                value={9}
                label="9"
                ss={{display: "flex", alignItems: "center", maxWidth: "25%", justifyContent: "space-around"}}
                {...register("size", { required: true })}
              />
              <Input
                type="checkbox"
                value={10}
                label="10"
                ss={{display: "flex", alignItems: "center", maxWidth: "25%", justifyContent: "space-around"}}
                {...register("size", { required: true })}
              />
              <Input
                type="checkbox"
                value={11}
                label="11"
                ss={{display: "flex", alignItems: "center", maxWidth: "25%", justifyContent: "space-around"}}
                {...register("size", { required: true })}
              />
              <Input
                type="checkbox"
                value={12}
                label="12"
                ss={{display: "flex", alignItems: "center", maxWidth: "25%", justifyContent: "space-around"}}
                {...register("size", { required: true })}
              />
            </div>
            <div className={style.inputBox}>
              <Select
                style={{ marginTop: "5px" }}
                label="Brand"
                options={["Adidas", "Nike", "Puma", "Reebok", "Fila"]}
                {...register("brand", { required: true })}
              />
            </div>
            <div className={style.inputBox}>
              <Select
                style={{ marginTop: "5px" }}
                label="Color"
                options={["Red", "Blue", "Cyan", "Green"]}
                {...register("color", { required: true })}
              />
            </div>

            <label className={style.GenderHeading}>Gender</label>

            <div className={style.RadioDiv}>
              <Input
                className={style.InputRadio}
                label="Men"
                type="checkbox"
                value="M"
                {...register("gender", { required: true })}
              />
            </div>

            <div className={style.RadioDiv}>
              <Input
                label="Women"
                className={style.InputRadio}
                type="checkbox"
                value="F"
                {...register("gender", { required: true })}
              />
            </div>

            <div className={style.RadioDiv}>
              <Input
                label="Kids"
                className={style.InputRadio}
                type="checkbox"
                value="K"
                {...register("gender", { required: true })}
              />
            </div>
          </div>
        </div>
        <div className={style.section}>
          <div className={style.SectionContainer}>
            <h1 className={style.sectionContainerHeading}>Price</h1>
          </div>

          <div className={style.sub}>
            {/* <div className={style.inputBox}>
              <input
                style={{
                  marginTop: "5px",
                  border: "none",
                  borderBottom: "1px solid var(--Border-2, #CCC)",
                  backgroundColor: "rgb(249, 249, 249)",
                }}
                label="Product Tags"
                // {...register("tags", { required: true })}
              />
            </div> */}
            <div className={style.inputBox}>
              <Input
                style={{
                  marginTop: "5px",
                  border: "none",
                  borderBottom: "1px solid var(--Border-2, #CCC)",
                  backgroundColor: "rgb(249, 249, 249)",
                }}
                type="number"
                label="Product Price"
                placeholder="Product Price"
                {...register("price", { required: true })}
              />
            </div>
          </div>
        </div>
        <div className={style.ButtonDiv}>
          <Button className={style.Button} type="submit">
            Create Request
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default CreateProduct;
