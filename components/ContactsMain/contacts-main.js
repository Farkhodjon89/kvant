import { useState } from 'react';
import Breadcrumbs from '../Breadcrumbs/breadcrumbs';
import Link from 'next/link';

import s from './contacts-main.module.scss';

const ContactsMain = () => {
  const [active, setActive] = useState(1);
  const breadcrumbs = [
    {
      name: 'Главная',
      link: '/',
    },
    {
      name: 'Контакты',
      link: `/branches`,
    },
  ];
  const data = [
    {
      id: 1,
      name: 'Рынок строительных материалов»',
      store: 'Рынок строительных материалов',
      address: 'Рынок строительных материалов, 2-блок, 67-магазин',
      phone: '+998 90 341 03 14',
      image: '/contacts/1.jpg',
    },
    {
      id: 2,
      name: 'Магазин Denov ATP, INGCO',
      store: 'Магазин Denov ATP, INGCO',
      address: 'Магазин Denov ATP, INGCO',
      phone: '+998 91 902 43 73',
      image: '/contacts/2.jpg',
    },
    {
      id: 3,
      name: 'Базар Урикзар',
      store: 'Базар Урикзар, 99-магазин',
      address: 'Базар Урикзар, 99-магазин',
      phone: '+998 97 809 13 13',
      image: '/contacts/3.jpg',
    },
    {
      id: 4,
      name: 'Jomiy Bozor',
      store: 'Jomiy bozor, 15B',
      address: 'Jomiy bozor, 15B',
      phone: '+998 99 677 72 60',
      image: '/contacts/4.jpg',
    },
    {
      id: 5,
      name: 'Базар Урикзар',
      store: 'Базар Урикзар, 57-магазин',
      address: 'Базар Урикзар, 57-магазин',
      phone: '+998 99 774 34 23',
      image: '/contacts/4.jpg',
    },
    {
      id: 6,
      name: 'Quyoshli Erkin Savdo Majmuasi',
      store: 'Quyoshli Erkin Savdo Majmuasi Первый Ряд, 15-магазин',
      address: 'Quyoshli Erkin Savdo Majmuasi Первый Ряд, 15-магазин',
      phone: '+998 91 574 10 02',
      image: '/contacts/4.jpg',
    },

    {
      id: 7,
      name: 'Головной офис',
      store: 'Головной офис, Выставочный зал',
      address: 'Головной офис, Выставочный зал',
      phone: '+998 97 777 40 04',
      image: '/contacts/4.jpg',
    },
  ];
  return (
    <div>
      <div className={s.title}>Контакты</div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={s.wrapper}>
        <div className={s.left}>
          <div className={s.name}> Наши филиалы </div>
          {data.map(({ id, name }) => (
            <div
              key={id}
              onClick={() => setActive(id)}
              className={`${s.leftDivs} ${active === id ? s.active : ''}`}>
              {name}
            </div>
          ))}
        </div>
        <div className={s.right}>
          {data.map(
            ({ id, name, store, address, phone, image }) =>
              active === id && (
                <div key={id}>
                  <div className={s.name}>{name}</div>
                  <div className={s.rightDivs}>
                    Магазин: <span> {store} </span>
                  </div>
                  <div className={s.rightDivs}>
                    Адрес: <span> {address} </span>
                  </div>
                  <div className={s.rightDivs}>
                    Номер телефона:
                    <span>
                      <Link href={`tel:${phone}`}>
                        <a> {phone} </a>
                      </Link>
                    </span>
                  </div>
                  {/*<img src={image} alt='' />*/}
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactsMain;
