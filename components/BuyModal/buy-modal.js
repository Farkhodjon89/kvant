import { useState } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import { getFormatPrice } from '../../utils/price';
import Link from 'next/link';
import MaskedInput from 'react-input-mask';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import icons from '../../public/fixture';

import s from './buy-modal.module.scss';

const BuyModal = ({ buy, setBuy, product, selectedProductId }) => {
  const { register, handleSubmit, errors } = useForm();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const makeOrder = async () => {
    setIsLoading(true);

    const orderData = {
      set_paid: false,
      currency: 'UZS',
      status: 'processing',
      payment_method_title: 'cash',
      line_items: [
        {
          product_id: product.databaseId,
          name: product.name,
          price: product.onSale ? product.woocsSalePrice : product.woocsRegularPrice,
          quantity: product.quantity,
          variation_id: product.variations && selectedProductId,
        },
      ],
      billing: {
        first_name: name,
        phone: phone,
      },
    };

    const response = await axios.post('/api/order', { order: orderData });

    if (response.data.status) {
      setBuy(false);
      setSuccess(true);
      setOrder(response.data.order.id);
    } else {
      alert(response.data.message);
      router.reload();
    }
    setIsLoading(false);
  };

  return (
    <>
      <ReactModal
        isOpen={buy}
        onRequestClose={() => setBuy(false)}
        ariaHideApp={false}
        overlayClassName={s.modalOverlay}
        className={s.modalContent}>
        <div className={s.modalTitle}>
          Купить сейчас
          <span dangerouslySetInnerHTML={{ __html: icons.close }} onClick={() => setBuy(false)} />
        </div>

        <>
          <div className={s.productName}> {product.name} </div>
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
                Количество: <span> 1</span>
              </div>
            </div>
          </div>

          <div className={s.inputs}>
            <input
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              ref={register({ required: true })}
              className={`${errors.name && s.error} ${name ? s.valid : ''}`}
            />
            <label htmlFor="name">Имя Фамилия</label>
            {errors.name ? <p className={s.errorMessage}>Необходимо заполнить</p> : null}
          </div>

          <div className={s.inputs}>
            <MaskedInput
                placeholder='+998   _ _   _ _ _   _ _   _ _'
                onChange={(e) => setPhone(e.target.value)}
                name='phone'
                mask='+\9\98(99)9999999'
                alwaysShowMask
                value={phone}
                className={errors.phone && s.error}
            >
              {(inputProps) => (
                  <input
                      ref={register({
                        required: true,
                        pattern: /^[\+]?[0-9]{3}?[-\s\.]?[(]?[0-9]{2}?[)][-\s\.]?[0-9]{3}?[-\s\.]?[0-9]{2}?[-\s\.]?[0-9]{2}$/im,
                      })}
                      value={phone}
                      name={inputProps.name}
                      {...inputProps}
                  />
              )}
            </MaskedInput>
            {errors.phone ? <p className={s.errorMessage}>Необходимо заполнить</p> : null}
          </div>

          <div className={s.details}>
            Итого
            <span>
              {getFormatPrice(
                parseInt(product.onSale ? product.woocsSalePrice : product.woocsRegularPrice),
              )}
            </span>
          </div>
          <button className={s.modalBtnBlue} onClick={handleSubmit(makeOrder)}>
            {isLoading ? (
              <div className={s.loaderAnimation}></div>
            ) : (
              <>
                <span dangerouslySetInnerHTML={{ __html: icons.instantBuyModal }} />
                'Купить сейчас'
              </>
            )}
          </button>
        </>
      </ReactModal>
      {success ? (
        <ReactModal
          isOpen={success}
          onRequestClose={() => setSuccess(false)}
          ariaHideApp={false}
          overlayClassName={s.modalOverlay}
          className={s.modalContent}>
          <section className={s.wrapper}>
            <div className={s.heading}>
              <div className={s.logo}>
                <img src="/header/two_logo.svg" alt="" className={s.logo} />
              </div>
              <h2 className={s.title}>Успешно отправлен</h2>
              <div className={s.description}>
                Если у вас возникли вопросы, обращайтесь по телефону и мы обязательно решим
                возникший вопрос
                <Link href="tel:+998 (71) 100-00-00">
                  <a> +998 (71) 100-00-00</a>
                </Link>
              </div>
            </div>
            <div className={s.clientData}>
              <h2 className={s.title}>Данные заказа</h2>
              <ul className={s.list}>
                <li className={s.item}>
                  <p>Номер заказа</p> <span>{order}</span>
                </li>
                <li className={s.item}>
                  <p>Имя</p> <span>{name}</span>
                </li>
                <li className={s.item}>
                  <p>Номер телефона</p> <span>{phone}</span>
                </li>
                <li className={s.item}>
                  <p>Итого</p>{' '}
                  <span>{product.onSale ? product.woocsSalePrice : product.woocsRegularPrice}</span>
                </li>
              </ul>
            </div>
            {/* <OrderReview /> */}
            <button className={s.button} onClick={() => setSuccess(false)}>
              Ок
            </button>
          </section>
        </ReactModal>
      ) : null}
    </>
  );
};

export default BuyModal;
