import React from 'react'
import s from './layout-two.module.scss'
import Link from 'next/link'
import {useRouter} from 'next/router'

const LayoutTwo = ({children}) => {
  const router = useRouter()
  return (
      <>
        <div className={s.header}>
          <div className={s.headerInner}>
            {/* {router.pathname === '/checkout' ? (
            <>
              <Link href='/cart'>
                <a>
                  <img src='/icons/arrowLeft.svg' alt='' />
                  <span>Orqaga</span>
                </a>
              </Link>
              <Link href='/'>
                <a className={s.logo}>
                  <img src='/header/logo.svg' alt='' />
                </a>
              </Link>
              <Link href='/'>
                <a>
                  <img src='/icons/phone.svg' alt='' />
                  <span>(55) 500-88-77</span>
                </a>
              </Link>
            </>
          ) : (
            <Link href='/'>
              <a className={s.logo}>
                <img src='/header/logo.svg' alt='' />
              </a>
            </Link>
          )} */}
            <div className={s.info}>
              <div>
                <img src='/public/icons/return.svg' alt=''/> Возврат и доставка по Ташкенту
              </div>
              {/*<div>*/}
              {/*  <img src='/public/icons/wear.svg' alt=''/> Бесплатная примерка*/}
              {/*</div>*/}
            </div>
            <Link href='/'>
              <a>
                <img className={s.logo} src='/header/Kvantlogo_white.svg' alt=''/>
              </a>
            </Link>
            <div className={s.leftSide}>
              <Link href='tel:+998 95 195 09 01'>
                <a>
                  <img className={s.phoneLogo} src='/public/icons/phone.svg' alt=''/>
                  <span>+998 95 195 09 01</span>
                </a>
              </Link>
              <Link href='tel:+998 97 777 40 04'>
                <a>
                  <img className={s.phoneLogo2} src='/public/icons/phone.svg' alt=''/>
                  <span>+998 97 777 40 04</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className={s.wrapper}>{children}</div>
        <div className={s.footer}>
          <div className={s.footerInner}>
            <div>© 2021 Bloom. Все права защищены</div>
            <Link href='https://billz.uz/'>
              <a target='_blank'>
                E-commerce решение от
                <img src='/footer/billz.svg' alt=''/>
              </a>
            </Link>
          </div>
        </div>
      </>
  )
}

export default LayoutTwo
