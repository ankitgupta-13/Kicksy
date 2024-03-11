import style from "./Anime.module.css";
import img from "../../assets/images/AnimePage/bakugoS.png";
import img2 from "../../assets/images/AnimePage/spideyS.png";
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

import ProductDesc from "../ProductDesc/ProductDesc";
import { getAllProducts } from "../../api/user.api";





const Anime = () => {
  const [explore, setExplore] = useState(false);
  const [animeShoes, setAnimeShoes] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);


  
    //trying something above

  //   const fetchProducts = async () => {
  //     try {
  //       const response = await getAllProducts();
        
  //       const filteredProducts = response.data.products.filter(
  //         (product) => product.category === "Anime"
  //       ); 

  //       setProducts(filteredProducts); 
  //     } catch (error) {
  //       console.error("Error fetching anime shoes:", error);
  //     }
  //   };

  //   fetchProducts(); 
  // }, []);

  console.log(explore);
  

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
                        
                          </div> ))}
                        </div>                   
                  </div>
              </div>



            <div style={{ marginTop: "5%" }}>
        {products.filter((product) => product.category === "anime").map((shoe) => (
          <ProductDesc key={shoe._id} product={shoe} />
        ))}
      </div>


      </div>
    </div>
  );
};

export default Anime;
