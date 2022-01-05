import s from './brand-list.module.scss'
import Link from 'next/link'

const BrandList = ({ brands }) => {
  let letters = []
  let brandList = []

  for (const letter of brands) {
    let list = []
    letters.push(
      <div className={letter.brands.length != 0 ? s.active : null}>
        {letter.letter}
      </div>
    )

    if (letter.brands.length != 0) {
      for (const brand of letter.brands) {
        list.push(
          <Link href={'/catalog/' + brand.slug} key={brand.name}>
            <a>{brand.name}</a>
          </Link>
        )
      }
      brandList.push(
        <div>
          <div className={s.capital}>{letter.letter}</div>
          <div className={s.links}>{list}</div>
        </div>
      )
    }
  }

  return (
    <div className={s.wrapper}>
      <div className={s.letters}>{letters}</div>
      <div>{brandList}</div>
    </div>
  )
}

export default BrandList
