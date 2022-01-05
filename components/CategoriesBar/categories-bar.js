import React, { useState } from 'react'
import s from './categories-bar.module.scss'
import Link from 'next/link'

const CategoriesBar = ({ categories }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        {categories.map(({ name, slug, children }, i) => (
          <Joki name={name} slug={slug} children={children} key={i} category={categories} />
        ))}
      </div>
    </div>
  )
}

export default CategoriesBar

const Joki = ({ category, name, slug, children }) => {
  const [isShown, setIsShown] = useState(false)
  return (
    <div className={s.moki} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
      <Link href={`/catalog/${slug}`}>
        <a className={isShown ? s.hover : ''}>{name}</a>
      </Link>
      {isShown && (
        <div className={s.joki}>
          <div className={s.jokiInner}>
            {children.map(({ name, slug, children }, i) => (
              <div className={s.jokiMoki}>
                <Link href={`/catalog/${slug}`} key={i}>
                  <a>{name}</a>
                </Link>
                <div>
                  {children.map((r, i) => (
                    <>
                      <Link href={`/catalog/${r.slug}`} key={i}>
                        <a className={s.jokiLink}>{r.name}</a>
                      </Link>
                    </>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
