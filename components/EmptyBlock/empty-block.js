import Link from 'next/link';

import s from './empty-block.module.scss';

const EmptyBlock = () => {
  return (
    <div className={s.wrapper}>
      <div>Корзина пуста</div>
      <Link href="/catalog">
        <a>Начать покупки</a>
      </Link>
    </div>
  );
};

export default EmptyBlock;
