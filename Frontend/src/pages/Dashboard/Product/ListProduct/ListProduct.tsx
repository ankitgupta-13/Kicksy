import { useEffect, useState } from "react";
import { getProducts } from "../../../../api/admin.api";
import style from "./ListProduct.module.css";
import ProductDashboardCard from "../../../../components/ProductDashboardCard/ProductDashboardCard";
import { Pagination } from "@mui/material";

const ListProduct = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  const allProducts = async (page) => {
    const response = await getProducts(page);
    if (response.statusCode === 200) {
      setProducts(response.data.products);
    }
  };

  useEffect(() => {
    allProducts(page);
  }, [page]);

  return (
    <div className={style.container}>
      <div className={style.sectionTitle}>
        <div>Product</div>
        <div>Create at</div>
        <div>Stock</div>
        <div>Price</div>
      </div>
      {products.map((product, index) => {
        return (
          <div key={index}>
            <ProductDashboardCard data={product} />
          </div>
        );
      })}
      <div className={style.pagination}>
        <Pagination
          count={10}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </div>
    </div>
  );
};

export default ListProduct;
