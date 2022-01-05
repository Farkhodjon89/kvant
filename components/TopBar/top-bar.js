import React from 'react';
import s from './top-bar.module.scss';
import Link from 'next/link';

const TopBar = () => (
  <div className={s.wrapper}>
    <div className={s.inner}>
      <div>
        <img src="icons/return.svg" alt="" /> Бесплатная доставка по Ташкенту
      </div>
      <div className={s.leftSide}>
        <Link href="tel:+998 95 195 09 01">
          <a>
            <img src="icons/phone.svg" alt="" />
            +998 95 195 09 01
          </a>
        </Link>
        <Link href="tel:+998 97 777 40 04">
          <a className={s.secondNumber}>
            <img src="icons/phone.svg" alt="" />
            +998 97 777 40 04
          </a>
        </Link>

      </div>
    </div>
  </div>
);
export default TopBar;
