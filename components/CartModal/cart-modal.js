import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { getFormatPrice } from '../../utils/price';
import icons from '../../public/fixture';
// import { connect } from 'react-redux';
// import { deleteFromCart } from '../../redux/actions/cartActions';

import s from './cart-modal.module.scss';

const CartModal = ({ cartItems, deleteFromCart, cartModal, setCartModal }) => {
  const myRef = useRef();
  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      setCartModal && setCartModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  if (!cartItems.length) {
    setCartModal && setCartModal(false);
  }

  let cartTotalPrice = 0;

  return (
    <div ref={myRef} className={`${s.wrapper}  ${cartModal ? s.active : ''}`}>
      <div className={s.top}>
        КОРЗИНА
        <span
          style={{ cursor: 'pointer' }}
          dangerouslySetInnerHTML={{ __html: icons.close }}
          onClick={() => setCartModal(false)}
        />
      </div>
      <div className={s.cardList}>
        {cartItems.map((product, i) => {
          cartTotalPrice += product.onSale
            ? product.woocsSalePrice
            : product.woocsRegularPrice * product.quantity;
          return (
            <div className={s.card} key={i}>
              <div className={s.cardTop}>
                <div className={s.name}> {product.name} </div>
                <div className={s.action}>
                  <div onClick={() => deleteFromCart(product.databaseId)}>Удалить</div>
                </div>
              </div>
              <div className={s.cardInner}>
                <img src={product.image.sourceUrl} alt="" className={s.img} />
                <div className={s.info}>
                  <div className={s.price}>
                    {getFormatPrice(
                      product.onSale ? product.woocsSalePrice : product.woocsRegularPrice,
                    )}
                  </div>
                  <div className={s.quantity}>
                    Кол-во: <span>{'1'}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={s.bot}>
        <div className={s.details}>
          Итого
          <span>{getFormatPrice(cartTotalPrice)}</span>
        </div>
        <Link href="/checkout">
          <a className={s.checkout}>Оформить заказ</a>
        </Link>
        <Link href="/cart">
          <a className={s.checkout2}>Перейти в корзину</a>
        </Link>
      </div>
    </div>
  );
};
export default CartModal;
// const mapStateToProps = (state) => {
//   return {
//     cartItems: state.cartData,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     deleteFromCart: (item) => {
//       dispatch(deleteFromCart(item));
//     },
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
