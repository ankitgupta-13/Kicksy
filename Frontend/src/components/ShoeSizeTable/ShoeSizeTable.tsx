import React from 'react';
import style from './shoeSizeTable.module.css';
const ShoeSizeTable = () => {
    const shoes = [
        { brand: '', size: 5, ukIndia: 38, usa: 6, heelToToe: 9.4 },
        { brand: '', size: 5.5, ukIndia: 38.5, usa: 6.5, heelToToe: 9.6 },
        { brand: '', size: 6, ukIndia: 39, usa: 7, heelToToe: 9.8 },
        { brand: '', size: 6.5, ukIndia: 40, usa: 7.5, heelToToe: 10 },
        { brand: '', size: 7, ukIndia: 40.5, usa: 8, heelToToe: 10.2 },
        { brand: '', size: 7.5, ukIndia: 41, usa: 8.5, heelToToe: 10.4 },
        { brand: '', size: 8, ukIndia: 42, usa: 9, heelToToe: 10.6 },
        { brand: '', size: 8.5, ukIndia: 42.5, usa: 9.5, heelToToe: 10.8 },
        { brand: '', size: 9, ukIndia: 43, usa: 10, heelToToe: 11 },
        { brand: '', size: 9.5, ukIndia: 44, usa: 10.5, heelToToe: 11.2 },
        { brand: '', size: 10, ukIndia: 44.5, usa: 11, heelToToe: 11.4 },
        { brand: '', size: 10.5, ukIndia: 45, usa: 11.5, heelToToe: 11.6 },
        { brand: '', size: 11, ukIndia: 46, usa: 12, heelToToe: 11.8 },
    ];

    return (
        <table className={style.table}>
            <thead className={style.thead}>
                <tr className={style.tr}>
                    <th className={`${style.th} ${style.th1}`}>Size</th>
                    <th className={style.th}>UK/India</th>
                    <th className={style.th}>USA</th>
                    <th className={`${style.th} ${style.th2}`}>Heel to Toe (in)</th>
                </tr>
            </thead>
            <tbody>
                {shoes.map((shoe) => (
                    <tr className={style.tr} key={shoe.size}>
                        <td className={style.td}>{shoe.size}</td>
                        <td className={style.td}>{shoe.ukIndia}</td>
                        <td className={style.td}>{shoe.usa}</td>
                        <td className={style.td}>{shoe.heelToToe}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ShoeSizeTable;