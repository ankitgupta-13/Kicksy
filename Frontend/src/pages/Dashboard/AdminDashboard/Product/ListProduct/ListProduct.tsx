import { useEffect, useState } from "react";
import { getProducts, totalProductsCount } from "../../../../../api/admin.api";
import style from "./ListProduct.module.css";
import { Pagination } from "@mui/material";
import { ProductDashboardCard } from "../../../../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";

const ListProduct = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);

  const userRole = useSelector((state: RootState) => state.auth.userData.role);

  const getLimitedProducts = async (page) => {
    const response = await getProducts(page);
    if (response.statusCode === 200) {
      setProducts(response.data.products);
    }
  };

  const countProducts = async () => {
    const response = await totalProductsCount();
    setProductsCount(response.data);
  };

  // const handleDeleteProduct = async (_id: Number, images: []) => {
  //   try {
  //     await deleteProduct({ _id, images });
  //     getLimitedProducts(page);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getLimitedProducts(page);
  }, [page]);

  useEffect(() => {
    countProducts();
  }, []);

  return (
    <div className={style.container}>
      {userRole === "admin" ?
        <div className={style.sectionTitle}>
          <div className={style.text}>Product</div>
          <div style={{ display: "flex", justifyContent: "space-between", width: "58vw", marginLeft: "-3vw" }}>
            <div className={style.text}>Create at</div>
            <div className={style.text}>Stock</div>
            <div className={style.text}>Price</div>
          </div>
        </div>
        :
        <div className={style.sectionTitle}>
          <div className={style.text}>Product</div>
          <div style={{ display: "flex", justifyContent: "space-between", width: "58vw", marginLeft: "-5vw" }}>
            <div className={style.text}>Product ID</div>
            <div className={style.text}>Brand</div>
            <div className={style.text}>Price</div>
          </div>
        </div>
      }
      {products.map((product, index) => {
        return (
          <div key={index}>
            <ProductDashboardCard data={product} page={page} />
          </div>
        );
      })}
      <div className={style.pagination}>
        <Pagination
          count={Math.ceil(productsCount / 10)}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </div>
    </div>
  );
};

export default ListProduct;
