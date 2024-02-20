import { useEffect, useState } from "react";
import style from "./colorCard.module.css";
import ShoesColor from "../../assets/shoes_color.png"; // Dummy Image To Append Color of Shoes
import NikeShoes from "../../assets/images/nike_shoes.png"; // Dummy Image To Change On Click

interface ColorCardProps {
  id: number;
  color: string;
  activeId: number;
  setActiveId: (id: number) => void;
  setImageSrc: (src: string) => void;
}

const colorCard: React.FC<ColorCardProps> = ({ imageUrl }) => {
  //   id,
  //   color,
  //   activeId,
  //   setActiveId,
  //   setImageSrc,
  // }) => {
  // const [isSelected, setIsSelected] = useState(false);
  // useEffect(() => {
  //   if (activeId === id) {
  //     setIsSelected(true);
  //     setImageSrc(NikeShoes);
  //   } else {
  //     setIsSelected(false);
  //   }
  // }, [activeId]);

  return (
    <div className={style.container}>
      <img
        src={imageUrl}
        className={style.shoes__color}
        // onClick={() => {
        //   setActiveId(id);
        // }}
        // style={{
        //   border: isSelected ? "0.5px solid #212121" : "0px",
        //   borderRadius: "2px",
        //   outline: "none",
        // }}
      />
    </div>
  );
};

export default colorCard;
