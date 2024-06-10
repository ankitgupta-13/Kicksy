<<<<<<< HEAD
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllProducts } from "../../api/user.api";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import ProductCard from "../../components/ProductCard/ProductCard";
import style from "./Shop.module.css";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import MediaQuery from "react-responsive";

const Shop: React.FC = () => {
  const [mActives, setmActives] = useState();
  const [wActives, setwActives] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const cleanstring = location.search.substring(1);
  const [key, value] = cleanstring.split("=");
  const [filters, setFilters] = useState({});
  const [allProducts, setAllProducts] = useState([]);
=======
import React, { useState, useEffect } from "react";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import { filterProducts } from "../../api/product.api"; // Adjust the path accordingly
import style from "./Shop.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useLocation } from 'react-router-dom';
import banner from "../../assets/menbanner.png";
import { Button } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MediaQuery from "react-responsive";

const Shop: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const cleanstring = location.search.substring(1);
  const [filters, setFilters] = useState(cleanstring ? [cleanstring] : []);
>>>>>>> e5d070819315f9fe549df852200cffa85c020fe5
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  useEffect(() => {
<<<<<<< HEAD
    const fetchAllProducts = async () => {
      {
        value &&
          setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: [value],
          }));
      }
      const data = await getAllProducts();
      setAllProducts(data.data.products);
=======
    const fetchFilteredProducts = async () => {
      const data = await filterProducts(filters);
      setFilteredProducts(data.data);
      // console.log(data.data);
      // console.log(filteredProducts);
>>>>>>> e5d070819315f9fe549df852200cffa85c020fe5
    };
    fetchFilteredProducts();
    scrollTo(0, 0);
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

<<<<<<< HEAD
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleGenderButtonClick = (gender: string) => {
    const genderFilterName = "gender";
    if (gender === "M") {
      setmActives(!mActives);
      onFilterChange(genderFilterName, mActives ? [] : [gender]);
    } else if (gender === "F") {
      setwActives(!wActives);
      onFilterChange(genderFilterName, wActives ? [] : [gender]);
    }
=======
  const handleFilterChange = async (newFilters: string[]) => {
    setFilters(newFilters);
    const data = await filterProducts(newFilters);
    setFilteredProducts(data.data);
    // console.log(filteredProducts);
>>>>>>> e5d070819315f9fe549df852200cffa85c020fe5
  };

  const handleFilterSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className={style.shoppage}>
<<<<<<< HEAD
        <div
          className={style.filtersidebar}
          style={{ display: sidebarOpen ? "block" : "none" }}
        >
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
          />
=======
        <div className={style.filtersidebar} style={{ display: sidebarOpen ? "block" : "none" }}>
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange}  />
>>>>>>> e5d070819315f9fe549df852200cffa85c020fe5
        </div>
        <div className={style.filterbar}>
          <div className={style.topbuttons}>
            <Button
              className={style.Button}
<<<<<<< HEAD
              style={{
                opacity: sidebarOpen ? "0" : "1",
                backgroundColor: mActives ? "black" : "white",
                color: mActives ? "white" : "black",
                width: "80px",
              }}
              onClick={() => handleGenderButtonClick("M")}
            >
              Men
            </Button>
            <Button
              className={style.Button}
              style={{
                opacity: sidebarOpen ? "0" : "1",
                backgroundColor: wActives ? "black" : "white",
                color: wActives ? "white" : "black",
                width: "80px",
              }}
              onClick={() => handleGenderButtonClick("F")}
            >
              Women
            </Button>
            <Button
              className={style.Button}
              style={{
                backgroundColor: sidebarOpen ? "white" : "#f0f0f0",
                color: "black",
                width: "80px",
                border: sidebarOpen ? "none" : "1px solid black",
                right: sidebarOpen ? "-11px" : "",
              }}
=======
              style={{ backgroundColor: sidebarOpen ? 'white' : '#f0f0f0', color: 'black', width: '80px', border: sidebarOpen ? 'none' : '1px solid black', right: sidebarOpen ? '-11px' : '' }}
>>>>>>> e5d070819315f9fe549df852200cffa85c020fe5
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