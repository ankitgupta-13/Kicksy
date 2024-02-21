import { useEffect, useState } from "react";
import { getAllProducts } from "../../../../api/admin.api";
import style from "./ListProduct.module.css";
import ProductDashboardCard from "../../../../components/ProductDashboardCard/ProductDashboardCard";

const ListProduct = () => {
  const [products, setProducts] = useState([]);

  const allProducts = async () => {
    const response = await getAllProducts();
    if (response.statusCode === 200) {
      setProducts(response.data);
    }
  };

  useEffect(() => {
    allProducts();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.sectionTitle}>
        <div>Product</div>
        <div>Create at</div>
        <div>Stock</div>
        <div>Price</div>
        <div>Publish</div>
      </div>
      {products.map((product, index) => {
        return (
          <div key={index}>
            <ProductDashboardCard data={product} />
          </div>
        );
      })}
    </div>
  );
};

export default ListProduct;
