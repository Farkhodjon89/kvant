import { useState } from 'react';
import Link from 'next/link';
import icons from '../../public/fixture';
import s from './accordion.module.scss';

const Accordion = ({ name, parent, child, children, setOpen }) => {
  const [expand, setExpand] = useState(false);
  return (
    <div>
      <div
        onClick={() => setExpand((expand) => !expand)}
        className={`${s.name} ${expand ? s.active : ''}`}>
        {name}
         <img src="/icons/down.svg" alt="" />
      </div>
      {expand &&
        children?.map(({ name, slug, children }, i) =>
          children.length > 0 ? (
            <Accordion2 name={name} children={children} parent={parent} setOpen={setOpen} />
          ) : (
            <Link href={`/catalog/${slug}`} key={i}>
              <a className={s.link} onClick={() => setOpen && setOpen(false)}>
                {name}
              </a>
            </Link>
          ),
        )}
    </div>
  );
};
export default Accordion;

const Accordion2 = ({ name, parent, children, setOpen }) => {
  const [expand, setExpand] = useState(false);
  return (
    <div>
      <div
        onClick={() => setExpand((expand) => !expand)}
        className={`${s.name} ${expand ? s.active : ''}`}>
        {name}
         <img src="/icons/down.svg" alt="" />
      </div>
      {expand &&
        children?.map(({ name, slug }, i) => (
          <Link href={`/catalog/${slug}`} key={i}>
            <a className={s.link} onClick={() => setOpen && setOpen(false)}>
              {name}
            </a>
          </Link>
        ))}
    </div>
  );
};
