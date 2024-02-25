import React from 'react';
import style from "./HeroSection.module.css";
import HeroImg1 from "../../assets/images/HeroImg1.png";
import HeroImg2 from "../../assets/images/HeroImg2.png";
import HeroImg3 from "../../assets/images/HeroImg3.png";
import HeroImg4 from "../../assets/images/HeroImg4.png";
import HeroImg5 from "../../assets/images/HeroImg5.png";
import HeroImg6 from "../../assets/images/HeroImg6.png";

function HeroSection() {
    return (
        <div>
            <div className={style.container}>
                <div className={style.div1}>
                    <img src={HeroImg1} alt="" className={style.verticalImage} />
                    <img src={HeroImg4} alt="" className={style.squareImage} />
                </div>
                <div className={style.div2}>
                    <img src={HeroImg2} alt="" className={style.squareImage} />
                    <div className={style.CenterBox}>
                        <h1 className={style.CenterBoxTitle}>Designed to<br/>
                            complement your<br/>
                            everyday life</h1>
                        <p className={style.CenterBoxContent}>
                            Lorem ipsum dolor sit amet consectetur. Aliquet risus aliquam ac pretium viverra amet ornare. Integer elementum adipiscing vel ut ut natoque congue tortor id. Vulputate pellentesque tempor ultricies nibh eu. Imperdiet vitae fusce proin posuere faucibus ac dignissim eget.
                        </p>
                    </div>
                    <img src={HeroImg5} alt="" className={`${style.squareImage} ${style.HeroImg5}`} />
                </div>
                <div className={style.div3}>
                    <img src={HeroImg3} alt="" className={style.squareImage} />
                    <img src={HeroImg6} alt="" className={style.verticalImage} />
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
