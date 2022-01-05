import React from 'react';
import s from './breadcrumbs.module.scss';
import Link from 'next/link';

const Breadcrumbs = ({ breadcrumbs }) => (
  <div className={s.wrapper}>
    {breadcrumbs.map(({ name, link }) => (
      <Link href={link} key={name}>
        <a>{name}</a>
      </Link>
    ))}
  </div>
);
export default Breadcrumbs;
