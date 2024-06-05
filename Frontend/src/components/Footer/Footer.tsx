import style from "./Footer.module.css";

import fbIcon from "../../assets/fb-icon.png"
import igIcon from "../../assets/ig-icon.png"
import ptIcon from "../../assets/pt-icon.png"
import ytIcon from "../../assets/yt-icon.png"


const Footer = () => {
  return (
    <>
      <div className={style.Footer}>
        <div className={style.footerBottom}>
          <div className={style.section4}>
            <p className={style.content2} style={{ width: "61%" }}>
              Lorem ipsum dolor sit amet consectetur. Sed dolor netus sed vitae
              convallis ullamcorper. Sapien quisque vitae fermentum neque eget at.
              Tempor sit nisl nulla amet morbi turpis.
            </p>
            <p className={style.content3} style={{ width: "47%" }}>
              For order related queries & bulk orders, email - support@Krisksy.com
            </p>
          </div>
          <div className={style.section6}>
            <ul>
              <li>SUPPORT</li>
              <li>Track Your Order</li>
              <li>Shipping & Return Policy</li>
              <li>FAQs</li>
              <li>About Us</li>
              <li>Contact Support</li>
            </ul>
          </div>
          <div className={style.section7}>
            <p>CONNECT WITH US</p>
            <div>
              <img className={style.section7icons} src={igIcon} />
              <img className={style.section7icons} src={ytIcon} />
              <img className={style.section7icons} src={fbIcon} />
              <img className={style.section7icons} src={ptIcon} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
