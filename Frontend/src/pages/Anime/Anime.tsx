import { useState, useEffect} from "react";
import ProductDesc from "../ProductDesc/ProductDesc";
import { getAllProducts } from "../../api/user.api";
// import heroImg from "../../assets/images/anime-hero-img.png";
import style from "./Anime.module.css";
import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/images/AnimePage/bakugoS.png";
import img2 from "../../assets/images/AnimePage/spideyS.png";


import aiz from "../../assets/images/AnimePage/aizawa.png"
import panel from "../../assets/images/AnimePage/picture.png"

/*images*/
import d1 from "../../assets/images/AnimePage/panels/D1.jpg"
import d2 from "../../assets/images/AnimePage/panels/D2.jpg"
import d5 from "../../assets/images/AnimePage/panels/D5.jpg"
import d7 from "../../assets/images/AnimePage/panels/D7.jpg"
import m10 from "../../assets/images/AnimePage/panels/M10.jpg"
import n2 from "../../assets/images/AnimePage/panels/N2.jpg"
import n3 from "../../assets/images/AnimePage/panels/N3.jpg"
import n4 from "../../assets/images/AnimePage/panels/N4.jpg"
import n6 from "../../assets/images/AnimePage/panels/N6.jpg"
import n8 from "../../assets/images/AnimePage/panels/N8.jpg"
import n9 from "../../assets/images/AnimePage/panels/N9.jpg"
import n12 from "../../assets/images/AnimePage/panels/N12.jpg"




import yeah from "../../assets/images/AnimePage/backdrop/Yeah.png"
import bang from "../../assets/images/AnimePage/backdrop/Bang.png"
import bg from "../../assets/images/AnimePage/backdrop/bg.png"
import blastic from "../../assets/images/AnimePage/backdrop/blastic.png"
import Hallo from "../../assets/images/AnimePage/backdrop/Hallo.png"
import Hi from "../../assets/images/AnimePage/backdrop/Hi.png"
import lCorner from "../../assets/images/AnimePage/backdrop/lCorner.png"
import rCorner from "../../assets/images/AnimePage/backdrop/rCorner.png"
import { Button, PaymentButton, ProductCard } from "../../components";
import ColorCard from "../../components/colorCard/colorCard";
import { getProductById } from "../../api/product.api";






const Anime = () => {
  const dispatch = useDispatch();
  const [explore, setExplore] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [animeProducts, setAnimeProducts] = useState([]);
  const [productID, setProductID] = useState([]);
  const [curProduct, setCurProduct] = useState([]);
  // console.log(curProduct);
  const [shoesColorData, setShoesColorData] = useState([]);
  const [activeColor, setActiveColor] = useState("");
  const [activeColorId, setActiveColorId] = useState<number | null>(null);
  const [size, setSize] = useState();

  const [animePg, setAnimePg] = useState(true);

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
  const getCurrentProduct = async () => {
    const payload = {
      productID ,
    };
    const response = await getProductById(payload);
    if (response.statusCode === 200) {
      setCurProduct(response.data);
      setShoesColorData(response.data.images);
    }
  };

  const fetchAllProducts = async () => {
    const data = await getAllProducts();
    setAllProducts(data.data.products);
  };

  const getAnimeProducts = () => {
      const animeProducts = allProducts.filter(product => product.category === 'anime');
      setAnimeProducts(animeProducts);
  };

  useEffect(() => {
    fetchAllProducts();
    getAnimeProducts();
    getCurrentProduct();
    
  }, [allProducts]);

  return (
    <div className={style.mainBody}>
      { animePg ?
          <div>
            <div className={style.animepage}>
              <div className={style.ani1}></div>
              <div className={style.cont1}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptates suscipit voluptas eius doloremque, accusantium quidem! Eum voluptatum architecto, rerum perspiciatis doloribus amet adipisci! Quidem, ea quia qui odio dolor esse laudantium nemo autem enim nam corrupti quas sequi doloribus vitae iure. Recusandae veniam veritatis dolorum id ab sunt excepturi similique suscipit dolor facilis? Iure voluptatum, quibusdam, laborum ratione debitis perspiciatis, voluptate quos reprehenderit ut modi veritatis dolorum id quis? Quod laudantium sequi sed impedit facilis illum voluptates repudiandae! Tempore dolorem accusantium pariatur ad quis porro ipsam quisquam, est commodi! Sunt non quo vitae! Dolor sapiente inventore qui velit corporis?
              </div>
              <div className={style.ani2}></div>
              <div className={style.ani3}></div>
              <div className={style.cont2}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos commodi aliquid omnis cupiditate officiis sint nemo, autem, expedita quis aspernatur dolore dolor sed alias nostrum labore eaque deserunt id maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam enim ullam delectus exercitationem? Et modi minus exercitationem.
              </div>
            </div>
            <div className={style.explore_btn}>
              <button className={style.exp_btn} onClick={() => setAnimePg(!animePg)}>Explore</button>
            </div>
          </div> :
          <div>
              {curProduct && <div style={{ margin: "25px" }}>
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
                  <h2>Rs. </h2>  
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
            </div>}
            <div>
            <h2>Our Collection</h2>
            <p>
              lorem ispum lorem ispum
            </p>
          </div>
          <div className={style.productlist}>
            {animeProducts.map((product: any, index: number) => (
              <div className={style.listitem} key={index} style={{ width: "25vw"}}>
              <div onClick={() => setProductID(product._id)}><ProductCard product={product} /></div>
              </div>
            ))}
            </div>
    </div>
}
    </div>
  );
}
export default Anime;
