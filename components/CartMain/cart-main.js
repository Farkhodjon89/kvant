import EmptyBlock from '../EmptyBlock/empty-block';
import Link from 'next/link';
import { connect } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/actions/cartActions';
import { addToWishlist, deleteFromWishlist } from '../../redux/actions/wishlistActions';
import { getFormatPrice } from '../../utils/price';
import icons from '../../public/fixture';
import Image from 'next/image'

import s from './cart-main.module.scss';

const CartMain = ({
  cartItems,
  wishlistItems,
  deleteFromCart,
  decreaseQuantity,
  addToWishlist,
  deleteFromWishlist,
}) => {
  let cartTotalPrice = 0;

  return cartItems.length >= 1 ? (
    <div>
      <div className={s.heading}>КОРЗИНА</div>
      <div className={s.divider}></div>

      <div className={s.wrapper}>
        <div className={s.left}>
          {cartItems.map((product) => {
            const wishlistItem = wishlistItems.filter(
              (wishlistItem) => wishlistItem.id === product.id,
            )[0];
            cartTotalPrice += product.onSale
              ? product.woocsSalePrice
              : product.woocsRegularPrice * product.quantity;
            return (
              <>
                <div className={`${s.card} ${s.showDesktop} `} key={product.id}>
                  <div className={s.img}>
                    <Image width={170} height={170} src={product.image.sourceUrl} alt="" />
                  </div>
                  <div className={s.info}>
                    <div className={s.namePrice}>
                      <div className={s.name}> {product.name} </div>
                      <div className={s.price}>
                        {getFormatPrice(
                          product.onSale ? product.woocsSalePrice : product.woocsRegularPrice,
                        )}
                      </div>
                    </div>

                    <div className={s.separator}>
                      <div>
                        <div className={s.color}>Кол-во:</div>

                        <div className={s.amount_img}>
                          <span className={s.quantity}> {product.quantity}</span>
                          <span dangerouslySetInnerHTML={{ __html: icons.arrowDown }} />
                        </div>
                      </div>

                      <div
                        onClick={() => deleteFromCart(product.databaseId)}
                        className={s.delete}>
                        <span
                          dangerouslySetInnerHTML={{ __html: icons.trash }}
                          style={{ marginRight: '0.2rem' }}
                        />
                        Удалить товар
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile version */}
                <div className={s.showMobile}>
                  <div className={s.productName}>
                    <div className={s.name2}>{product.name}</div>
                    <div
                      onClick={() => deleteFromCart(product.databaseId)}
                      className={s.delete}>
                      Удалить
                    </div>
                  </div>

                  <div className={s.card}>
                    <div className={s.img}>
                      <img src={product.image.sourceUrl} alt="" />
                    </div>

                    <div className={s.info}>
                      <div className={s.productPrice}>
                        {getFormatPrice(
                          product.onSale ? product.woocsSalePrice : product.woocsRegularPrice,
                        )}
                      </div>

                      <div className={s.color}>
                        Кол-во:
                        <span className={s.quantity}> {product.quantity}</span>
                        <img
                          src="/public/icons/arrowDown.svg"
                          alt=""
                          onClick={() => console.log('easy')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className={s.right}>
          <div className={s.title}>Итог заказа</div>
          <div className={s.underline}></div>

          <div className={s.details}>
            <div>
              Подытог
              <span>{getFormatPrice(cartTotalPrice)}</span>
            </div>
            <div>
              Доставка
              <span>{cartTotalPrice >= 300000 ? '0' : '25000'} UZS</span>
            </div>
            <div>
              Итого
              <span>{getFormatPrice(cartTotalPrice + (cartTotalPrice >= 500000 ? 0 : 25000))}</span>
            </div>
          </div>
          <Link href="/checkout">
            <a className={s.checkout}>Оформить заказ</a>
          </Link>
          {/*<Link href='/checkout'>*/}
          {/*  <a className={s.buy}>Купить сейчас</a>*/}
          {/*</Link>*/}
        </div>
      </div>
      {/* <ProductsList /> */}
    </div>
  ) : (
    <EmptyBlock />
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
    addToCart: (item) => {
      dispatch(addToCart(item));
    },
    deleteFromCart: (item) => {
      dispatch(deleteFromCart(item));
    },
    addToWishlist: (item) => {
      dispatch(addToWishlist(item));
    },
    deleteFromWishlist: (item) => {
      dispatch(deleteFromWishlist(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartMain);
