import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import { Alert } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaQuery from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../api/product.api";
import { addToCart, getRecentProducts } from "../../api/user.api";
import AccordionComp from "../../components/Accordion/AccordionComp";
import Button from "../../components/Button/Button";
import ImageSliderProdDesc from "../../components/ImageSliderProdDesc/ImageSliderProdDesc";
import ProductCard from "../../components/ProductCard/ProductCard";
import ShoeSizeTable from "../../components/ShoeSizeTable/ShoeSizeTable";
import { addItemToCart } from "../../redux/reducers/cartSlice";
import style from "./ProductDesc.module.css";

const ProductDesc = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [curProduct, setCurProduct] = useState([]);
  const [shoesColorData, setShoesColorData] = useState([]);
  const [size, setSize] = useState();
  const [sizes, setSizes] = useState([]);
  const [showSizeTable, setShowSizeTable] = useState(false);
  const [inStock, setInStock] = useState(true);
  const userID = useSelector((state) => state.auth?.userData?._id);
  const { id: productID } = useParams();

  const [success, setSuccess] = useState("");

  const options = { month: "short", day: "2-digit", year: "numeric" };
  const date = new Date(curProduct?.createdAt);
  const formattedDate = date?.toLocaleDateString("en-IN", options);

  const getCurrentProduct = async () => {
    const payload = {
      productID,
    };
    const response = await getProductById(payload);
    if (response.statusCode === 200) {
      setCurProduct(response.data);
      setShoesColorData(response.data.images);
      setSizes(response.data.size);
    }
  };

  const { data: recentProducts } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: async () => {
      const data = await getRecentProducts();
      return data.data;
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    getCurrentProduct();
    window.scrollTo(0, 0);
  }, [productID]);

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  const handleAddToCart = async (sellerID) => {
    const payload = {
      userID,
      productID,
      sellerID,
    };
    try {
      const result = await addToCart(payload);
      setSuccess(result.message);
      dispatch(addItemToCart(result.data.items));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className={style.main} style={{ overflowX: "hidden" }}>
        <div className={style.product}>
          <MediaQuery minWidth={431}>
            <div className={style.product_imagediv}>
              <span className={style.product_path}>
                {curProduct.category} | {curProduct.brand} | {curProduct.title}
              </span>
              <ImageSliderProdDesc imageUrls={shoesColorData} />
            </div>
          </MediaQuery>
          <MediaQuery maxWidth={431}>
            <div
              className={style.product_imagediv_phone}
              style={{ border: "none" }}
            >
              <ImageSliderProdDesc imageUrls={shoesColorData} />
            </div>
          </MediaQuery>
          <div className={style.action}>
            <h4 className={style.SampleBrand}>{curProduct.brand}</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2 className={style.SampleProduct}>{curProduct.title}</h2>
              {curProduct.category === "bestseller" && (
                <a className={style.bestseller}>BEST SELLER</a>
              )}
              <h1>
                Rs. {curProduct?.bestPrice?.price?.toLocaleString("en-IN")}
              </h1>
            </div>

            <div className={style.action_sz_add}>
              <div>
                <MediaQuery minWidth={431}>
                  <div
                    className={style.sizechart_bg}
                    style={{
                      display: showSizeTable ? "block" : "none",
                      zIndex: 3,
                    }}
                  >
                    <span
                      className={style.sizechart_close}
                      onClick={() => setShowSizeTable(false)}
                      style={{
                        cursor: "pointer",
                        color: "#000",
                        background: "white",
                        position: "absolute",
                        transform: "translate(-50%, -50%)",
                        top: "87vh",
                        left: "50vw",
                        padding: "10px 20px",
                        borderRadius: "50px",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontWeight: "600",
                      }}
                    >
                      CLOSE
                    </span>
                    <div className={style.sizechart_table}>
                      <ShoeSizeTable />
                    </div>
                  </div>
                  <div className={style.sizechart}>
                    <span className={style.sizechart1}>
                      Browse Sizes
                      <span>* All basic sizes are shown</span>
                    </span>
                    <span
                      className={style.sizechart2}
                      onClick={() => setShowSizeTable(true)}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                      }}
                    >
                      <StraightenOutlinedIcon
                        style={{
                          transform: "rotate(127deg)",
                          fontSize: "18px",
                        }}
                      />{" "}
                      Size Chart
                    </span>
                  </div>
                </MediaQuery>
              </div>
              <div>
                <select
                  className={style.size}
                  value={size}
                  onChange={handleChange}
                >
                  {sizes.map((size, index) => (
                    <option value={size} key={index}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                className={style.BuyNowBtn}
                style={{
                  backgroundColor: "black",
                  padding: "0.5rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  height: "3rem",
                  color: "white",
                  border: "none",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  fontFamily: "Noir Pro",
                  cursor: "pointer",
                }}
                price={curProduct?.bestPrice?.price?.toLocaleString("en-IN")}
                // productID={curProduct._id}
                onClick={() => {
                  handleAddToCart(curProduct.bestPrice.sellerID);
                  navigate(`${userID ? "/checkout" : "/login"}`);
                }}
              >
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "20%",
                  }}
                >
                  <span style={{ fontSize: "10px", width: "100%" }}>
                    Best Price
                  </span>
                  <span>
                    ₹{curProduct?.bestPrice?.price?.toLocaleString("en-IN")}
                  </span>
                </span>
                <span
                  style={{
                    display: "flex",
                    width: "inherit",
                    height: "inherit",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingRight: "13%",
                    fontWeight: 600,
                    letterSpacing: "1px",
                  }}
                >
                  Buy Now
                </span>
              </Button>
            </div>

            <div className={style.sellers}>
              {curProduct?.offers?.map((seller) => (
                <div key={seller.sellerID._id}>
                  <div className={style.sellerCard}>
                    <div className={style.sLogoName}>
                      <img
                        src={seller.sellerID.storeLogo}
                        alt=""
                        className={style.storeLogo}
                      />
                      <p>{seller?.sellerID?.storeName}</p>
                    </div>
                    <Button
                      className={style.priceButton}
                      onClick={() => {
                        {
                          userID
                            ? handleAddToCart(seller.sellerID._id)
                            : navigate("/login");
                        }
                      }}
                    >
                      <h1>₹{seller?.price?.toLocaleString("en-IN")}</h1>
                      <ShoppingCartIcon />
                    </Button>
                  </div>
                </div>
              ))}
              {success ? (
                <Alert
                  onClose={() => {
                    setSuccess("");
                  }}
                  // style={{ margin: "20px 0 0 0" }}
                  severity="success"
                >
                  {success}
                </Alert>
              ) : (
                ""
              )}
            </div>

            <MediaQuery minWidth={431}>
              <div className={style.features}>
                <AccordionComp isInStock={inStock} canReturn={true} />
              </div>
            </MediaQuery>
          </div>
        </div>

        <div className={style.description}>
          <h1 className={style.productDescTitle}>Product Detail</h1>
          <h3 className={style.productDesc}>{curProduct.description}</h3>
          <a>Read More</a>
        </div>

        <div className={style.table}>
          <div className={style.column}>
            <h5 style={{ color: "#656565" }}>MANUFACTURED SKU</h5>
            <p>{curProduct._id}</p>
            <h5 style={{ color: "#656565" }}>COLORWAY</h5>
            <p>{curProduct.color}</p>
          </div>
          <div className={style.column}>
            <h5 style={{ color: "#656565" }}>BRAND</h5>
            <p>{curProduct.brand}</p>
            <h5 style={{ color: "#656565" }}>GENDER</h5>
            <p>{curProduct.gender}</p>
          </div>
          <div className={style.column}>
            <h5 style={{ color: "#656565" }}>NICKNAME</h5>
            <p>{curProduct.title}</p>
            <h5 style={{ color: "#656565" }}>RELEASE DATE</h5>
            <p>{formattedDate}</p>
          </div>
        </div>
      </div>
      <div className={style.AlsoLikeSlider}>
        <div className={style.AlsoLikeContainer}>
          <h1 className={style.AlsoLikeSliderTitle}>You may also like</h1>
          <div className={`${style.cards} ${style.alsoLikeCards}`}>
            {recentProducts?.map((product, index) => {
              return (
                <div key={index}>
                  <MediaQuery minWidth={431}>
                    <ProductCard product={product} wid="18.5vw" />
                  </MediaQuery>
                  <MediaQuery maxWidth={431}>
                    <ProductCard product={product} wid="10rem" />
                  </MediaQuery>
                </div>
              );
            })}
          </div>
        </div>
        <MediaQuery minWidth={440}>
          <h1 className={style.NewArrivalsSliderTitle}>New Arrivals</h1>
        </MediaQuery>
        <MediaQuery maxWidth={430}>
          <h1 className={style.NewArrivalsSliderTitle}>You Might Also Like</h1>
        </MediaQuery>
        <div className={`${style.cards} ${style.alsoLikeCards}`}>
          {recentProducts?.map((product, index) => {
            return (
              <div key={index} style={{ marginBottom: "30px" }}>
                <MediaQuery minWidth={431}>
                  <ProductCard product={product} wid="18.5vw" />
                </MediaQuery>
                <MediaQuery maxWidth={431}>
                  <ProductCard product={product} wid="10rem" />
                </MediaQuery>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDesc;
