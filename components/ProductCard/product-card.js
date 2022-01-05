import { useEffect, useState } from 'react';
import BuyModal from '../BuyModal/buy-modal';
import ImageGallery from 'react-image-gallery';
import { getFormatPrice, getDiscountPrice } from '../../utils/price';
import CartModal from '../CartModal/cart-modal';
import icons from '../../public/fixture';

import s from './product-card.module.scss';

const ProductCard = ({
  product,
  cartItems,
  wishlistItems,
  addToCart,
  deleteFromCart,
  addToWishlist,
  deleteFromWishlist,
}) => {
  const discountPrice = getDiscountPrice(product);
  const [selectedProductId, setSelectedProductId] = useState(product.databaseId);

  const [selectedProductImage, setSelectedProductImage] = useState(product.image.sourceUrl);
  const cartItem = cartItems.filter(
    (cartItem) => cartItem.databaseId === selectedProductId,
  )[0];
  const wishlistItem = wishlistItems.filter((wishlistItem) => wishlistItem.id === product.id)[0];

  const galleryImages = product.galleryImages.nodes.map(({ sourceUrl }) => ({
    original: sourceUrl,
    thumbnail: sourceUrl,
  }));
  const images = [
    {
      original: selectedProductImage,
      thumbnail: selectedProductImage,
    },
    ...galleryImages,
  ];

  const [windowWidth, setWindowWidth] = useState();
  const resizeWindow = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    return () => window.removeEventListener('resize', resizeWindow);
  }, []);

  const [buy, setBuy] = useState(false);
  const [cartModal, setCartModal] = useState(false);

  return (
    <div className={s.wrapper}>
      <div className={s.left}>
        <ImageGallery
          items={images}
          thumbnailPosition="left"
          showThumbnails={windowWidth <= 1100 ? false : true}
          showBullets={windowWidth <= 1100 ? true : false}
          showPlayButton={false}
          showFullscreenButton={false}
          autoPlay={false}
        />
      </div>
      <div className={s.right}>
        <div className={s.sku}> SKU: {product.sku}</div>
        <div className={s.name}>{product.name}</div>
        <div className={s.jokiPrice}>
          {product.onSale ? (
            <>
              <div className={s.discountPrice}>-{discountPrice}%</div>
              <div className={s.normalPrice}>{getFormatPrice(product.woocsRegularPrice)}</div>{' '}
              <div className={s.salePrice}>{getFormatPrice(product.woocsSalePrice)}</div>
            </>
          ) : (
            <div className={s.price}>{getFormatPrice(product.woocsRegularPrice)}</div>
          )}
        </div>

        <button
          className={s.addToCard}
          onClick={
            cartItem
              ? () => deleteFromCart(selectedProductId)
              : () => {
                  addToCart(product, selectedProductId), setCartModal(true);
                }
          }>
          {cartItem ? 'В корзине' : 'Добавить в корзину'}
        </button>
        <div className={s.twoBtn}>
          <button className={s.buy} onClick={() => setBuy(true)}>
            Купить сейчас
          </button>
          <button
            className={`${s.addToWishlist} ${wishlistItem ? s.active : null}`}
            onClick={
              wishlistItem ? () => deleteFromWishlist(product) : () => addToWishlist(product)
            }
            dangerouslySetInnerHTML={{ __html: icons.like }}
          />
        </div>

        <BuyModal
          buy={buy}
          setBuy={setBuy}
          product={product}
          selectedProductId={selectedProductId}
        />
        <CartModal
          cartItems={cartItems}
          deleteFromCart={deleteFromCart}
          cartModal={cartModal}
          setCartModal={setCartModal}
        />
        <div>
          {/*<div className={s.info}>*/}
          {/*  <div>*/}
          {/*    <span*/}
          {/*      dangerouslySetInnerHTML={{ __html: icons.info2 }}*/}
          {/*      style={{ marginRight: '1rem' }}*/}
          {/*    />*/}
          {/*    Возможна покупка в рассрочку*/}
          {/*  </div>*/}
          {/*  <div>При покупке в рассрочку цена товара может отличаться</div>*/}
          {/*</div>*/}

          <div className={s.delivery}>
            <div>
              <span
                dangerouslySetInnerHTML={{ __html: icons.delivery }}
                style={{ marginRight: '1rem' }}
              />
              Доставка и возврат
            </div>
            <div>
              Бесплатная доставка при заказе свыше 300 000 UZS по Ташкенту осуществляется в течении
              24 часов с момента заказа
            </div>
          </div>
        </div>

        {product.description && (
          <div className={s.description}>
            <div>Описание товара</div>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
