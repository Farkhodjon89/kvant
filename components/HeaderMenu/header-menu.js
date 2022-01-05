import React, {useState} from 'react'
import s from './header-menu.module.scss'
import Link from 'next/link'
import TopBar from '../TopBar/top-bar'
import Accordion from '../Accordion/accordion'
import icons from "../../public/fixture";
import {connect} from "react-redux";

const HeaderMenu = ({categories, open, setOpen, cartItems, wishlistItems}) => {
  const [tab, setTab] = useState(0)
  const [expand, setExpand] = useState(false);

  const pages = [
    {
      name: 'О Бренде',
      slug: '/brands',
    },
    // {
    //   name: 'Каталог',
    //   link: '/catalog',
    // },
    {
      name: 'Сервисы и Услуги',
      slug: '/service',
    },
    {
      name: 'Филиалы',
      slug: '/branches',
    },
    {
      name: 'Рассрочка',
      slug: '/installment',
    }
  ]
  return (
      <div className={`${s.wrapper}  ${open && s.active}`}>
        <TopBar/>
        <div className={s.top}>
          <div className={s.user}>
            <Link href={'/account/'}>
              <a dangerouslySetInnerHTML={{__html: icons.user}} className={s.account}>
              </a>
            </Link>
          </div>
          <div className={s.wishlist}>
            <Link href={'/wishlist'}>
              <a className={s.headerWishlist}>
                <span dangerouslySetInnerHTML={{__html: icons.wishlist}}/>
                {wishlistItems.length > 0 && <span className={s.wishlistQuantity}>{wishlistItems.length}</span>}
              </a>
            </Link>
          </div>
          <Link href='/cart'>
            <a onClick={() => setOpen(false)}>
              <img src='/public/icons/blackCart.svg' alt=''/>
              <span> Корзина ({cartItems.length}) </span>
            </a>
          </Link>
          <img className={s.closeIcon} src='/icons/close.svg' alt='' onClick={() => setOpen(false)}/>
        </div>
        {/*<div className={s.tab}>*/}
        {/*  {Object.values(categories).map(({ name }, i) => (*/}
        {/*    <div key={i} onClick={() => setTab(i)} className={tab === i ? s.active : ''}>*/}
        {/*      {name}*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</div>*/}
        {/*<Link href='/catalog'>*/}
        {/*  <a>*/}
        {/*    Каталог*/}
        {/*  </a>*/}
        {/*</Link>*/}

        <div className={s.accordion}>
          <div
              onClick={() => setExpand((expand) => !expand)}
              className={`${s.name} ${expand ? s.active : ''}`}>
            Каталог
            <img src="/icons/down.svg" alt=""/>
          </div>

          {expand &&
          Object.values(categories).map(
              ({name, slug, children}, i) => (
                  <Accordion name={name} parent={slug} child={slug} key={i} setOpen={setOpen}>
                    {children}
                  </Accordion>
              )
          )}

          {pages.map(({slug, name}, i) => (
              <div className={s.name}>
                <Link href={slug}>
                  <a>
                    {name}
                  </a>
                </Link>
              </div>

          ))}


          {/*<Link href='/brands'>*/}
          {/*  <a className={s.brands}>Бренды</a>*/}
          {/*</Link>*/}
        </div>
      </div>
  )
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  }
}
export default connect(mapStateToProps)(HeaderMenu)
