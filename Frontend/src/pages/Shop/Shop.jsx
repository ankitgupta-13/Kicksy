import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import { getAllProducts, getFilteredProducts } from "../../api/product.api";
import { ProductCard } from "../../components";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import LoadingCard from "../../components/LoadingCard/LoadingCard";
import style from "./Shop.module.css";

const Shop = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState([]);

  const { data, isLoading, isError, error } =
    filters.length > 0
      ? useQuery({
          queryKey: ["products", filters],
          queryFn: ({ queryKey }) => getFilteredProducts(queryKey[1]),
        })
      : useQuery({
          queryKey: ["products"],
          queryFn: getAllProducts,
          staleTime: Infinity,
        });
  console.log(data, isLoading, isError, error);

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
            onFilterChange={(newFilters) => setFilters(newFilters)}
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
          {isLoading ? (
            <div className={style.loader}>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </div>
          ) : isError ? (
            <div className={style.noProducts}>Error fetching products</div>
          ) : data?.data?.products?.length === 0 ? (
            <div className={style.noProducts}>No products found</div>
          ) : (
            data?.data?.products?.map((product, index) => (
              <div className={style.listitem} key={index}>
                <MediaQuery minWidth={430}>
                  <ProductCard product={product} />
                </MediaQuery>

                <MediaQuery maxWidth={430}>
                  <ProductCard product={product} wid="45vw" />
                </MediaQuery>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
