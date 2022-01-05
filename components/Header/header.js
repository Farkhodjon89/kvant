import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import HeaderMenu from '../HeaderMenu/header-menu';
import TopBar from '../TopBar/top-bar';
import {connect} from 'react-redux';
import {deleteFromCart, setCartModal} from '../../redux/actions/cartActions';
import client from '../../apollo/apollo-client';
import {useLazyQuery} from '@apollo/react-hooks';
import CartModal from '../CartModal/cart-modal';
import icons from '../../public/fixture';
import PRODUCTS from '../../queries/products';
import s from './header.module.scss';
import HeaderModal from "../HeaderModal/header-modal";

const Header = ({categories, cartItems, deleteFromCart, wishlistItems}) => {
  const [open, setOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadProducts, {data, loading}] = useLazyQuery(PRODUCTS, {
    client,
  });
  const [windowWidth, setWindowWidth] = useState();
  let resizeWindow = () => setWindowWidth(window.innerWidth);
  useEffect(() => {
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    return () => window.removeEventListener('resize', resizeWindow);
  }, []);

  useEffect(() => {
    if (data && searchQuery.length) {
      setSearchResults(data.products.nodes);
    }
  }, [data]);

  const searchData = (e) => {
    setSearchResults([]);
    setSearchQuery(e.target.value);

    if (e.target.value.length) {
      loadProducts({
        variables: {
          first: 10,
          search: e.target.value,
        },
      });
    }
  };

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
      <>
        <TopBar/>
        <div className={s.wrapper}>
          <div className={s.inner}>
            <div className={s.left}>
            <span
                dangerouslySetInnerHTML={{__html: icons.burger2}}
                className={s.burger}
                onClick={() => setOpen(true)}
            />
            </div>
            <Link href="/">
              <a>
                <img className={s.logo} src="/header/Kvant_horz_logo.svg" alt=""/>
              </a>
            </Link>
            <div className={s.center}
                 style={{display: isSearchActive && windowWidth >= 1100 ? 'flex' : 'none'}}
            >
              <div className={s.catalog}
                   onMouseEnter={() => setIsShown(true)}
                   onMouseLeave={() => setIsShown(false)}
                   style={{display: 'flex', height: '100%', alignItems: 'center'}}>
                <Link href='/catalog'>
                  <a>
                    Каталог
                  </a>
                </Link>
                {isShown && (
                    <HeaderModal categories={categories}/>
                )}
              </div>
              {pages.map(({slug, name}, i) => (
                  <Link href={slug}>
                    <a>
                      {name}
                    </a>
                  </Link>
              ))}
            </div>
            <div className={s.right}>
              <div className={s.search}>
                <input
                    type="text"
                    placeholder="Поиск по сайту"
                    value={searchQuery}
                    onChange={searchData}
                    style={{display: isSearchActive ? 'none' : 'block'}}
                />

                {isSearchActive ? (
                    <span
                        dangerouslySetInnerHTML={{__html: icons.search2}}
                        style={{marginRight: '1rem'}}
                        onClick={() => {
                          setIsSearchActive((show) => !show);
                          setSearchResults([]);
                          setSearchQuery('');
                        }}
                    />
                ) : (
                    <span
                        dangerouslySetInnerHTML={{__html: icons.close}}
                        style={{marginRight: '1rem', marginLeft: '1rem'}}
                        onClick={() => {
                          setIsSearchActive((show) => !show);
                          setSearchResults([]);
                          setSearchQuery('');
                        }}
                    />
                )}

                <div className={s.searchList}>
                  {loading && !searchResults.length ? (
                      <div>Загрузка...</div>
                  ) : searchQuery.length && !searchResults.length ? (
                      <div>Товары не найдены</div>
                  ) : searchResults.length ? (
                      <div>
                        {searchResults.map((product) => (
                            <Link href={'/product/' + product.slug} key={product.key}>
                              <a>{product.name}</a>
                            </Link>
                        ))}
                      </div>
                  ) : null}
                </div>
              </div>
              <div className={s.user}>
                <Link href={'/account'}>
                  <a
                      dangerouslySetInnerHTML={{__html: icons.user}}
                      style={{marginRight: '1rem'}}></a>
                </Link>
              </div>
              <div className={s.wishlist}>
                <Link href={'/wishlist'}>
                  <a className={s.headerWishlist}>
                    <span dangerouslySetInnerHTML={{__html: icons.wishlist}}/>
                    {wishlistItems.length > 0 && (
                        <span className={s.wishlistQuantity}>{wishlistItems.length}</span>
                    )}
                  </a>
                </Link>
              </div>
              <a className={s.cartLink} onClick={() => setCartModal(true)}>
              <span
                  dangerouslySetInnerHTML={{__html: icons.cart2}}
                  style={{marginRight: '1rem'}}
              />
                <span className={s.cartWord}>Корзина</span> ({cartItems.length}){' '}
              </a>
            </div>
            <CartModal
                cartItems={cartItems}
                deleteFromCart={deleteFromCart}
                cartModal={cartModal}
                setCartModal={setCartModal}
            />
          </div>
        </div>
        <HeaderMenu categories={categories} open={open} setOpen={setOpen} cartItems={cartItems}/>
      </>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (item) => {
      dispatch(deleteFromCart(item));
    },
    setCartModal: () => {
      dispatch(setCartModal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
