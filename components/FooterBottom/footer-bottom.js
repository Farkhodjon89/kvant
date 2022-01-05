import React from 'react';
import s from './footer-bottom.module.scss';
import Link from 'next/link';

const FooterBottom = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <div className={s.bot}>
          {`© ${new Date().getFullYear()} Kvant. Все права защищены`}

          <Link href="https://billz.uz/e-market">
            <a target="_blank" rel="nofollow">
              E-commerce решение от
              <img src="/footer/billz.svg" alt="" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
