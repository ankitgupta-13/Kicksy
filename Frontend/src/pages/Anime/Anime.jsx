import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import { Alert } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import MediaQuery from "react-responsive";
import { getAllProducts, getProductById } from "../../api/product.api.js";
import heroImg from "../../assets/anime-hero-img.png";
import ani1Img from "../../assets/anime-one.png";
import ani3Img from "../../assets/anime-three.jpg";
import ani2Img from "../../assets/anime-two.jpg";
import banner from "../../assets/post_banner.jpg";
import ImageSliderProdDesc from "../../components/ImageSliderProdDesc/ImageSliderProdDesc.jsx";
import { Button } from "../../components/index.js";
import PostCard from "../../components/PostCard/PostCard.jsx";
import ProductCardAnime from "../../components/ProductCardAnime/ProductCardAnime.jsx";
import ShoeSizeTable from "../../components/ShoeSizeTable/ShoeSizeTable.jsx";
import style from "./Anime.module.css";

const Anime = () => {
  const dispatch = useDispatch();
  const [curProduct, setCurProduct] = useState([]);
  const [productID, setProductID] = useState([]);
  const [shoesColorData, setShoesColorData] = useState([]);
  const [size, setSize] = useState();
  const userID = useSelector((state) => state.auth?.userData?._id);
  const [success, setSuccess] = useState("");
  const [showSizeTable, setShowSizeTable] = useState(false);
  const [animePg, setAnimePg] = useState(true);

  const sizes = [
    { label: "Select Size" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
  ];
  const handleChange = (event) => {
    setSize(event.target.value);
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

  let { data: animeProducts } = useQuery({
    queryKey: ["animeProducts"],
    queryFn: async () => {
      const response = await getAllProducts();
      if (response.statusCode === 200) {
        animeProducts = response.data.products.filter(
          (product) => product.category === "anime"
        );
        return animeProducts;
      }
    },
    staleTime: Infinity,
  });

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
    <div className={style.mainBody}>
      {animePg ? (
        <div>
          <span
            style={{
              position: "absolute",
              zIndex: -1,
              top: 0,
              width: "100%",
              height: "9.5vh",
              backgroundColor: "#fff",
            }}
          ></span>
          <img
            style={{
              width: "100%",
              height: "100vh",
              position: "fixed",
              zIndex: -10,
              top: 0,
            }}
            src={banner}
            alt=""
          />
          <div className={style.animepage}>
            <div
              className={style.ani1}
              style={{ backgroundImage: `url(${ani1Img})` }}
            ></div>
            <div className={style.cont1}>
              <MediaQuery minWidth={431}>
                In the vibrant world of anime, footwear transcends mere
                function. Sneakers become imbued with character, reflecting the
                personalities and powers of the heroes who wear them. Naruto's
                bright orange kicks might channel his energetic ninja spirit,
                while the sleek, high-tech boots of a cyberpunk bounty hunter
                could conceal hidden gadgets. This fusion of fashion and
                function goes beyond aesthetics. Special shoes might grant
                superhuman speed, defy gravity with built-in anti-gravity tech,
                or even transform for combat. Anime sneakers become a visual
                language, hinting at a character's backstory, power set, and
                even their place within the narrative. They're not just
                footwear; they're an extension of the characters themselves.
              </MediaQuery>
              <MediaQuery maxWidth={431}>
                In the vibrant world of anime, footwear transcends mere
                function. Sneakers become imbued with character, reflecting the
                personalities and powers of the heroes who wear them. Naruto's
                bright orange kicks might channel his energetic ninja spirit,
                while the sleek, high-tech boots of a cyberpunk bounty hunter
                could conceal hidden gadgets.
              </MediaQuery>
            </div>
            <div
              className={style.ani2}
              style={{ backgroundImage: `url(${ani2Img})` }}
            ></div>
            <div
              className={style.ani3}
              style={{ backgroundImage: `url(${ani3Img})` }}
            ></div>
            <div className={style.cont2}>
              <MediaQuery minWidth={431}>
                This love for expressive footwear has spilled over into the real
                world. Fans can now snag sneakers featuring their favorite
                characters or designs inspired by iconic anime locations like
                the bustling streets of Neo Tokyo from Akira. Whether it's
                Ichigo's fiery boots or a pair of custom My Hero Academia kicks,
                anime and sneakers have formed a unique alliance, letting you
                walk the line between fantasy and reality with every step.
              </MediaQuery>
              <MediaQuery maxWidth={431}>
                This love for expressive footwear has spilled over into the real
                world. Fans can now snag sneakers featuring their favorite
                characters or designs inspired by iconic anime locations like
                the bustling streets of Neo Tokyo from Akira.
              </MediaQuery>
            </div>
          </div>
          <div className={style.explore_btn}>
            <button
              className={style.exp_btn}
              onClick={() => {
                setAnimePg(!animePg);
                window.scroll(0, 0);
              }}
            >
              Explore
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className={style.a_hero}>
            <button
              onClick={() => window.scrollTo({ top: 1300, behavior: "smooth" })}
              className={style.a_hero_btn}
            >
              VIEW COLLECTIONS <FaArrowRightLong />
            </button>
            <img style={{ width: "100%" }} src={heroImg} alt="" />
          </div>
          {curProduct && (
            <div style={{ margin: "25px" }}>
              <div className={style.product}>
                {/* <img
                src={activeColor}
                className={style.imagebox}
                alt="product-image"
              /> */}
                <MediaQuery minWidth={431}>
                  <div
                    className={style.product_imagediv}
                    // style={{ background: `url(${activeColor})` }}
                  >
                    <span className={style.product_path}>
                      {curProduct.category} | {curProduct.brand} |{" "}
                      {curProduct.title}
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
                      Rs.{" "}
                      {curProduct?.bestPrice?.price?.toLocaleString("en-IN")}
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
                        {sizes.map((size) => (
                          <option value={size.value}>{size.label}</option>
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
                      price={curProduct?.bestPrice?.price?.toLocaleString(
                        "en-IN"
                      )}
                      productID={curProduct._id}
                      onClick={() => {
                        handleAddToCart(curProduct.bestPrice.sellerID);
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
                          ₹
                          {curProduct?.bestPrice?.price?.toLocaleString(
                            "en-IN"
                          )}
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
                      <div>
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
                              handleAddToCart(seller.sellerID._id);
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
                </div>
              </div>
            </div>
          )}
          <div className={style.ourCollection}>
            <div>
              <h2 className={style.ourCollection_heading}>Our Collection</h2>
              <p className={style.ourCollection_content}>
                The Women’s adidas Samba OG “Beige/White/Gum” is a
                women’s-exclusive colorway of the retro indoor soccer shoe with
                neutral colors. The upper features a beige leather base that’s
                paired with white leather Three Stripes and “Samba” branding on
                the side. tonal suede overlay appears on the toe while a white
                leather heel tab breaks up the look on the back of the shoe. An
                old school “adidas” logo on the tongue ties into the Samba’s
                vintage look. A gum rubber sole completes the clean and
                versatile colorway.…
              </p>
            </div>
            <div className={`${style.productlist} ${style.cards}`}>
              {animeProducts.map((product, index) => (
                <div
                  className={style.listitem}
                  key={index}
                  style={{ width: "25vw" }}
                >
                  <div onClick={() => setProductID(product._id)}>
                    <MediaQuery minWidth={431}>
                      <ProductCardAnime product={product} wid="18.5vw" />
                    </MediaQuery>
                    <MediaQuery maxWidth={431}>
                      <ProductCardAnime product={product} wid="9rem" />
                    </MediaQuery>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={style.recent_blogs}>
            <div
              className={style.recent_blogs_title}
              style={{
                fontSize: "1rem",
              }}
            >
              Stay-up-to-date
            </div>
            <h2
              style={{
                marginTop: "0.7rem",
                fontSize: "2.5rem",
              }}
            >
              RECENT POSTS
            </h2>
            <div className={style.recent__blogs_container}>
              <PostCard />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Anime;
