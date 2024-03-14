import style from "./Anime.module.css";
import { useState, useEffect } from "react";
// import img3 from "../../assets/images/Animepage/animeBackdrop.png"

import aiz from "../../assets/images/AnimePage/aizawa.png"
import panel from "../../assets/images/AnimePage/picture.png"
import yeah from "../../assets/images/AnimePage/backdrop/Yeah.png"
import bang from "../../assets/images/AnimePage/backdrop/Bang.png"
import bg from "../../assets/images/AnimePage/backdrop/bg.png"
import blastic from "../../assets/images/AnimePage/backdrop/blastic.png"
import Hallo from "../../assets/images/AnimePage/backdrop/Hallo.png"
import Hi from "../../assets/images/AnimePage/backdrop/Hi.png"
import lCorner from "../../assets/images/AnimePage/backdrop/lCorner.png"
import rCorner from "../../assets/images/AnimePage/backdrop/rCorner.png"
import { addToCart, getAllProducts } from "../../api/user.api";
import { Button, PaymentButton, ProductCard } from "../../components";
import ColorCard from "../../components/colorCard/colorCard";
import { addItem } from "../../redux/reducers/cartSlice";
import { useDispatch } from "react-redux";



const Anime = () => {
  const dispatch = useDispatch();
  const [explore, setExplore] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [animeProducts, setAnimeProducts] = useState([]);
  const [curProduct, setCurProduct] = useState([]);
  const [shoesColorData, setShoesColorData] = useState([]);
  const [activeColor, setActiveColor] = useState("");
  const [activeColorId, setActiveColorId] = useState<number | null>(null);
  const [size, setSize] = useState();
  
  const handleImageSrcChange = (src: string) => {
    setActiveColor(src);
  };
  const sizes = [
    { label: "Select Size" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
  ];
  const handleChange = (event: any) => {
    setSize(event.target.value);
  };
  const handleAddToCart = async () => {
    const payload = {
      userID,
      productID,
    };
    try {
      const result = await addToCart(payload);
      console.log(result.data.items);
      dispatch(addItem(result.data.items));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      const data = await getAllProducts();
      setAllProducts(data.data.products);
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const getAnimeProducts = () => {
      console.log(allProducts);
      const animeProducts = allProducts.filter(product => product.category === 'anime');
      setAnimeProducts(animeProducts);
      console.log(animeProducts);
    }
    getAnimeProducts();
  }, [allProducts]);



  

  return (
    <div className={style.mainBody}>
      <div>
      <div className={explore ? style.exploresec : ""}>
        <div style={{display:"flex", flexDirection: "column"}}>
          <div className={style.Container_first}>
            
            
            <div style={{display:"flex", flexDirection: "column"}}>
              <img className={style.characterImg} src={aiz}></img>
              <div className={style.Content}>
              Explore our customized anime sneakers
              </div>
              <img className={style.picture} src={panel}></img>
              
            </div>
            


          </div>
          <div style={{margin:"5%", justifyContent: "center", }}>
              <button
                style={{
                  position: "relative",
                  width: "200px",
                  height: "40px",
                  right: "150px",
                  bottom: "20px",
                  // borderRadius: "10px",
                  backgroundColor: "white",
                  fontFamily: "Bevan",
                  letterSpacing: "1.5px",
                  justifyContent: "center",
                  color: "black",
                  left:"42%",
                  zIndex: "5",
                }}
                onClick={() => setExplore(true)}
              >
                Explore
              </button>
              </div>

          {/* <div className={style.Container_first}>
            <div className={style.Card2}>
              <div className={style.head}>
                {" "}
                Sneaker Culture + Anime Artistry
              </div>
              <div className={style.Content}>
                We understand your love for both quality footwear and
                captivating anime designs. That's why we've meticulously curated
                a collection that not only meets but exceeds your expectations.
                Each sneaker is a canvas, waiting to be adorned with the vibrant
                hues and intricate details of your favorite anime characters,
                ensuring that every step you take is a testament to your uniq ue
                style and personality.
              </div>
              <button
                style={{
                  position: "absolute",
                  width: "200px",
                  height: "40px",
                  right: "150px",
                  bottom: "100px",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  fontFamily: "Bevan",
                  letterSpacing: "1.5px",
                  justifyContent: "center",
                  color: "black",
                  left:"42%",
                  zIndex: "5",
                }}
                onClick={() => setExplore(true)}
              >
                Explore
              </button>
              <div className={style.Circle2}>
                <img className={style.image2} src={img2}></img>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      
      
     
      <div className={explore ? " " : style.exploresec}>
        
              <div className={style.Container}>                
                  <div className={style.animeBackdrop}>                 
                      <img className={style.back} src={bg}></img>
                      <img className={style.lCorner} src={lCorner}></img>
                      <img className={style.rCorner} src={rCorner}></img>
                      <img className={style.hallo} src={Hallo}></img>
                      <img className={style.yeah} src={yeah}></img>
                      <img className={style.bang} src={bang}></img>
                      <img className={style.hi} src={Hi}></img>
                      <img className={style.blastic} src={blastic}></img>
                      <img className={style.blastic} src={blastic}></img>
                      <img className={style.blastic} src={blastic}></img>
                      
                        <div className={style.header}>  
                          <div className={style.subTitle}>Lorem ipsum dolor sit amet consectetur.</div>
                          <div className={style.title}> Custom Anime Shoes</div>
                          <button className={style.red} onClick={() => setExplore(true)}>
                            View Collections 
                          </button>
                        
                          </div>
                        </div>                   
              </div>
              <div style={{ margin: "25px" }}>
        <div className={style.product}>
          <img
            src={activeColor}
            className={style.imagebox}
            alt="product-image"
          />
          <div className={style.action}>
            <h4 className={style.SampleBrand}>{curProduct.brand}</h4>
            <h2 className={style.SampleProduct}>{curProduct.title}</h2>
            {curProduct.category === "bestseller" && (
              <a className={style.bestseller}>BEST SELLER</a>
            )}
            {/* <h2>Rs. {curProduct.price.originalPrice}</h2> */}
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
            <Button
              className={style.addtocart}
              style={{ backgroundColor: "#131313", color: "white" }}
              onClick={handleAddToCart}
              type="submit"
            >
              Add to Cart
            </Button>
            <PaymentButton amount="10" />
          </div>
        </div>
        <div className={style.cards}>
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
        </div>

              <div>
                <h2>Our Collection</h2>
                <p>
                  lorem ispum lorem ispum
                </p>
              </div>
              <div className={style.productlist}>
              {animeProducts.map((product: any, index: number) => (
                <div key={index} onClick={() => {setCurProduct(product); setShoesColorData(product.images);}}>
                  <ProductCard product={product} />
                </div> 
              ))}
              </div> 
              </div>    
      </div>
    </div>
  );
};

export default Anime;
