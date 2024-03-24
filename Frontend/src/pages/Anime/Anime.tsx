import { useState, useEffect, useDispatch } from "react";
import ProductDesc from "../ProductDesc/ProductDesc";
import { getAllProducts } from "../../api/user.api";

import style from "./Anime.module.css";
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






const Anime = () => {
  // const dispatch = useDispatch();
  const [explore, setExplore] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [animeProducts, setAnimeProducts] = useState([]);
  const [curProduct, setCurProduct] = useState([]);
  console.log(curProduct);
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
      {/* <div>
        <div className={explore ? style.exploresec : ""}>
          <div style={{ display: "flex", flexDirection: "column" }}>


            <div className={style.gridding}>

              <img className={'${style.characterImg} ${style.col1}'} src={d5}></img>

              <div className={style.box1}>
                <div className={style.boxHead}>
                  The one-stop for custom anime shoes.
                </div>
                <div className={style.boxContent}>
                  We've crafted a fusion like no other, blending your passion for iconic
                  anime characters with the comfort and style of premium sneakers.
                  Here, every pair tells a story, merging the dynamic worlds of anime creativity and sneaker fashion
                  into one breathtaking masterpiece.
                </div>
              </div>

              <img className={'${style.characterImg} ${style.col3}'} src={n12}></img>

              <img className={'${style.characterImg} ${style.col4}'} src={n8}></img>
              <img className={'${style.characterImg} ${style.col2}'} src={n9}></img>

              <div className={style.ItemCol1}> LOL</div>

              <div className={style.box2}>
                <div className={style.boxHead}>
                  We Value Your Choices
                </div>
                <div className={style.boxContent}>
                  We've picked out sneakers just for you, blending quality with cool anime designs.
                  Each pair is like a blank page, ready for the colorful and detailed art of your
                  favorite anime characters. When you wear them, you'll stand out with your own
                  style and personality.
                </div>


                <div style={{ width: "100%", height: "0px", border: '2px black dotted', marginTop: "3%", marginBottom: "3%" }}></div>


                <div className={style.boxHead}>
                  The Product
                </div>
                <div className={style.boxContent}>
                  These sneakers are special because they combine good quality with awesome anime designs.
                  You can think of each shoe as a blank canvas where you can put your favorite anime characters
                  in vibrant colors and details. When you wear these sneakers, it shows off your unique style
                  and who you are.
                </div>
              </div>
              <div className={style.ItemCol4}> LOL</div>

              <img className={'${style.characterImg} ${style.col1}'} src={m10}></img>

              <img className={'${style.characterImg} ${style.col4}'} src={d2}></img>
              <img className={'${style.characterImg} ${style.col4}'} src={n6}></img>
              <img className={'${style.characterImg} ${style.col3}'} src={d1}></img>
              <img className={'${style.characterImg} ${style.col1}'} src={n4}></img>
              <img className={'${style.characterImg} ${style.col2}'} src={n2}></img>

              <div className={style.ItemCol3}> LOL</div>

              <img className={'${style.characterImg} ${style.col3}'} src={d7}></img>
              <img className={'${style.characterImg} ${style.col2}'} src={n3}></img>



            </div>

            <div style={{ margin: "5%", justifyContent: "center", }}>
              <button
                style={{
                  position: "relative",
                  width: "200px",
                  height: "40px",
                  right: "150px",
                  bottom: "20px",
                  backgroundColor: "white",
                  fontFamily: "Bevan",
                  letterSpacing: "1.5px",
                  justifyContent: "center",
                  color: "black",
                  left: "42%",
                  zIndex: "5",
                }}
                onClick={() => setExplore(true)}
              >
                Explore
              </button>
            </div>


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
          {curProduct[0] && <div style={{ margin: "25px" }}>
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
                {/* <h2>Rs. {curProduct.price.originalPrice}</h2> */} {/*
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
          </div>}
          <div>
            <h2>Our Collection</h2>
            <p>
              lorem ispum lorem ispum
            </p>
          </div> */}



          {/* <div style={{ marginTop: "5%" }}>
        {products.filter((product) => product.category === "anime").map((shoe) => (
          <ProductDesc key={shoe._id} product={shoe} />
        ))}
      </div> */}

          {/*             
            <div style={{display:"flex", flexDirection: "column"}}>
              <img className={style.characterImg} src={aiz}></img>
              <div className={style.Content}>
              Explore our customized anime sneakers
              </div>
              <img className={style.picture} src={panel}></img>
              
            </div> */}

        {/* </div>
      </div> */}

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
    </div>
  );
};

export default Anime;
