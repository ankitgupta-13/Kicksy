import { useNavigate, useParams } from "react-router-dom";
import style from "./ProductDesc.module.css";
import { useEffect, useState } from "react";
import { getRecentProducts, addToCart } from "../../api/user.api";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Button } from "../../components/index";
import { useSelector } from "react-redux";
import ColorCard from "../../components/colorCard/colorCard";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/reducers/cartSlice";
import { getProductById } from "../../api/product.api";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoeSizeTable from "../../components/ShoeSizeTable/ShoeSizeTable";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import AccordionComp from "../../components/Accordion/AccordionComp";
import MediaQuery from "react-responsive";

const ProductDesc = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productID } = useParams<{ id: string }>();
  const [products, setProducts] = useState([]);
  const [curProduct, setCurProduct] = useState([]);
  const [shoesColorData, setShoesColorData] = useState([]);
  const [activeColor, setActiveColor] = useState("");
  const [activeColorId, setActiveColorId] = useState<number | null>(null);
  const [size, setSize] = useState();
  const [showSizeTable, setShowSizeTable] = useState(false);
  const userID = useSelector((state: any) => state.auth?.userData?._id);

  const handleImageSrcChange = (src: string) => {
    setActiveColor(src);
  };

  const getProducts = async () => {
    const response = await getRecentProducts();
    if (response.statusCode === 200) setProducts(response.data);
  };
  const getCurrentProduct = async () => {
    const payload = {
      productID,
    };
    const response = await getProductById(payload);
    if (response.statusCode === 200) {
      setCurProduct(response.data);
      setShoesColorData(response.data.images);
    }
  };

  useEffect(() => {
    getProducts();
    getCurrentProduct();
  }, []);

  const sizes = [
    { label: "Select Size" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
  ];

  const handleChange = (event: any) => {
    setSize(event.target.value);
  };

  const handleAddToCart = async (sellerID) => {
    const payload = {
      userID,
      productID,
      sellerID,
    };
    try {
      const response = await addToCart(payload);
      if (response.statusCode === 200) {
        dispatch(
          addItemToCart({
            items: response.data.items,
            totalAmount: response.data.totalAmount,
          })
        );
        navigate("/checkout");
      }
      // dispatch(addItemToCart(result.data.items));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <div className={style.main}>
        <div className={style.product}>
          <MediaQuery minWidth={431}>
            <div
              className={style.product_imagediv}
              style={{ background: `url(${activeColor})` }}
            ></div>
          </MediaQuery>
          <MediaQuery maxWidth={431}>
            {/* <img
              src={activeColor}
              className={style.imagebox}
              alt="product-image"
            /> */}
            <div
              className={style.product_imagediv_phone}
              style={{ background: `url(${activeColor})` }}
            ></div>
          </MediaQuery>
          <MediaQuery maxWidth={431}>
            <div className={`${style.cards} ${style.carouselCards}`}>
              {shoesColorData.map((color, index) => (
                <ColorCard
                  key={index}
                  id={index}
                  color={color}
                  activeId={activeColorId || 0}
                  setActiveId={(id) => setActiveColorId(id)}
                  setImageSrc={handleImageSrcChange}
                />
              ))}
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
              <Button
                className={style.addtocart}
                style={{ backgroundColor: "#131313", color: "white" }}
                onClick={handleAddToCart}
                type="submit"
              >
                <h1>Rs. {curProduct?.price?.toLocaleString("en-IN")}</h1>
                BUY NOW
              </Button>
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
                  {sizes.map((size: any) => (
                    <option value={size.value}>{size.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={style.sellers}>
              {curProduct?.offers?.map((seller) => (
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
                    onClick={() => handleAddToCart(seller?._id)}
                  >
                    <h1>₹{seller?.price?.toLocaleString("en-IN")}</h1>
                    <ShoppingCartIcon />
                  </Button>
                </div>
              ))}
            </div>
            <MediaQuery minWidth={431}>
              <div className={style.features}>
                <AccordionComp isInStock={1} canReturn={true} />
              </div>
            </MediaQuery>
          </div>
        </div>
        <MediaQuery minWidth={431}>
          <div
            className={`${style.cards} ${style.carouselCards}`}
            style={{
              position: "absolute",
              transform: "translate(0, -50%)",
              left: "2vw",
              top: "650px",
              width: "55vw",
            }}
          >
            {shoesColorData.map((color, index) => (
              <ColorCard
                key={index}
                id={index}
                color={color}
                activeId={activeColorId || 0}
                setActiveId={(id) => setActiveColorId(id)}
                setImageSrc={handleImageSrcChange}
              />
            ))}
          </div>
        </MediaQuery>

        <div className={style.description}>
          <h1 className={style.productDescTitle}>Product Detail</h1>
          <h3 className={style.productDesc}>{curProduct.description}</h3>
          <a>Read More</a>
        </div>

        <div className={style.table}>
          <div className={style.column}>
            <h5 style={{ color: "#656565" }}>MANUFACTURED SKU</h5>
            <p></p>
            <h5 style={{ color: "#656565" }}>COLORWAY</h5>
            <p></p>
          </div>
          <div className={style.column}>
            <h5 style={{ color: "#656565" }}>BRAND</h5>
            <p></p>
            <h5 style={{ color: "#656565" }}>GENDER</h5>
            <p></p>
          </div>
          <div className={style.column}>
            <h5 style={{ color: "#656565" }}>NICKNAME</h5>
            <p></p>
            <h5 style={{ color: "#656565" }}>RELEASE DATE</h5>
            <p></p>
          </div>
        </div>
      </div>
      <div className={style.AlsoLikeSlider}>
        <div className={style.AlsoLikeContainer}>
          <h1 className={style.AlsoLikeSliderTitle}>You may also like</h1>
          <div className={style.cards}>
            {products.map((product: any, index: number) => {
              return (
                <div key={index}>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.NewArrivalsSlider}></div>
        <MediaQuery minWidth={440}>
          <h1 className={style.NewArrivalsSliderTitle}>New Arrivals</h1>
        </MediaQuery>
        <MediaQuery maxWidth={430}>
          <h1 className={style.NewArrivalsSliderTitle}>You Might Also Like</h1>
        </MediaQuery>
        <div className={`${style.cards} ${style.alsoLikeCards}`}>
          {products.map((product: any, index: number) => {
            return (
              <div key={index}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDesc;
