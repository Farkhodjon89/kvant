import React from 'react';
import s from './header-modal.module.scss';
import Link from 'next/link';

const HeaderModal = ({categories}) => {

  return (
      <div className={s.wrapper}>
        <div className={s.inner}>
          {categories.map(({name, slug, children}) => (
              <>
                <div className={s.innerFirst}>
                  <Link href={`/catalog/${slug}`}>
                    <a className={s.bold}>
                      {name}
                    </a>
                  </Link>
                  <div className={s.innerSecond}>
                    {children.map(({name, slug}) => (
                        <Link href={`/catalog/${slug}`}>
                          <a>
                            {name}
                          </a>
                        </Link>
                    ))}
                  </div>
                </div>
              </>
          ))}
        </div>
      </div>
  );
};

export default HeaderModal;