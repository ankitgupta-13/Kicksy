import { useEffect, useState } from "react";
import {
  deleteProduct,
  getProducts,
  totalProductsCount,
} from "../../../../../api/admin.api";
import style from "./ListProduct.module.css";
import { Pagination } from "@mui/material";
import { ProductAdminDashboardCard } from "../../../../../components";

const ListProduct = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);

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

  const handleDeleteProduct = async (_id: Number, images: []) => {
    try {
      await deleteProduct({ _id, images });
      getLimitedProducts(page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLimitedProducts(page);
  }, [page]);

  useEffect(() => {
    countProducts();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.sectionTitle}>
        <div>Product</div>
        <div>Create at</div>
        <div>Stock</div>
      </div>
      {products.map((product, index) => {
        return (
          <div key={index}>
            <ProductAdminDashboardCard
              data={product}
              onDeleteProduct={handleDeleteProduct}
              page={page}
            />
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
