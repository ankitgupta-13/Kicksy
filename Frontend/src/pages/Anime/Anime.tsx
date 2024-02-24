import React from 'react'
import style from "./Anime.module.css";
import img from "../../assets/images/AnimePage/bakugoS.png"
import img2 from "../../assets/images/AnimePage/SpideyS.png"
  

const Anime = () => {
  return (
    <div>
      <div className={style.Container}>
          
          <div className={style.Card1}>
            
            <div className={style.head}> Explore our customized anime sneakers</div>
            <div className={style.Content}> 
            Calling all anime aficionados and sneakerheads alike – we've crafted a fusion like no other, blending your passion for iconic anime characters with the comfort and style of premium sneakers. Here, every pair tells a story, merging the dynamic worlds of anime creativity and sneaker fashion into one breathtaking masterpiece.
            </div>  
              <div className={style.Circle1}>
                <img className={style.image} src={img}></img>
              </div>

          </div>

        </div>

      <div className={style.Container}>
        <div className={style.Card2}>
          <div className={style.Circle2}>
          <img className={style.image} src={img2}></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Anime