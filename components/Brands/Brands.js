import React, {useEffect, useState} from 'react';
import s from './Brands.module.scss'
import Link from 'next/link'

const Brands = ({brands}) => {
  const [windowWidth, setWindowWidth] = useState()
  let resizeWindow = () => setWindowWidth(window.innerWidth)
  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])
  return (
      <>
        <h1 className={s.titleBrands}>Эксклюзивно в bloom</h1>
        <div className={s.wrapper}>
          {brands.map(({url, image, mobimage},i) => (
              <div className={s.brand}>
                <Link href={url}>
                  <a><img src={windowWidth <= 440 ? mobimage.sourceUrl : image.sourceUrl}/></a>
                </Link>
              </div>
          ))}
        </div>
      </>

  );
};

export default Brands;