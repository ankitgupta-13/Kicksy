import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import { useLocation } from "react-router-dom";
import { filterProducts } from "../../api/product.api";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import ProductCard from "../../components/ProductCard/ProductCard";
import style from "./Shop.module.css";

const Shop = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const cleanstring = location.search.substring(1);
  const [filters, setFilters] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (filters) {
      const fetchFilteredProducts = async () => {
        const data = await filterProducts(filters);
        console.log(data);
        setFilteredProducts(data.data);
        // console.log(data.data);
        // console.log(filteredProducts);
      };
      fetchFilteredProducts();
      scrollTo(0, 0);
    }
  }, [filters]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 430) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  const handleFilterChange = async (newFilters) => {
    setFilters(newFilters);
    const data = await filterProducts(newFilters);
    setFilteredProducts(data.data);
    // console.log(filteredProducts);
  };

  const handleFilterSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className={style.shoppage}>
        <div
          className={style.filtersidebar}
          style={{ display: sidebarOpen ? "block" : "none" }}
        >
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className={style.filterbar}>
          <div className={style.topbuttons}>
            <Button
              className={style.Button}
              style={{
                backgroundColor: sidebarOpen ? "white" : "#f0f0f0",
                color: "black",
                width: "80px",
                border: sidebarOpen ? "none" : "1px solid black",
                right: sidebarOpen ? "-11px" : "",
              }}
              onClick={() => handleFilterSidebar()}
            >
              {sidebarOpen ? <CloseOutlinedIcon /> : <TuneIcon />}
            </Button>
          </div>
        </div>
        <div className={style.productlist}>
          {filteredProducts?.map((product, index) => (
            <div className={style.listitem} key={index}>
              <MediaQuery minWidth={430}>
                <ProductCard product={product} />
              </MediaQuery>

              <MediaQuery maxWidth={430}>
                <ProductCard product={product} wid="45vw" />
              </MediaQuery>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
