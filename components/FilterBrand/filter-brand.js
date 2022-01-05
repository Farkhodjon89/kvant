import icons from '../../public/fixture';
import s from './filter-brand.module.scss';

const FilterBrand = ({ brands, active, filterValues }) =>
  brands && (
    <div className={s.wrapper}>
      <div className={s.title}> БРЕНДЫ </div>
      <div className={s.action}>
        {brands?.map(({ name, slug }) => (
          <div
            key={slug}
            onClick={() => filterValues('brands', name)}
            className={(active || []).includes(name) ? s.active : ''}>
            {(active || []).includes(name) ? (
              // <img src="/public/icons/checkboxFilled.svg" alt="" />
              <span
                style={{ marginRight: '1rem' }}
                dangerouslySetInnerHTML={{ __html: icons.checkboxFilled }}
              />
            ) : (
              // <img src="/public/icons/checkbox.svg" alt="" />
              <span
                style={{ marginRight: '1rem' }}
                dangerouslySetInnerHTML={{ __html: icons.checkbox }}
              />
            )}
            {name}
          </div>
        ))}
      </div>
    </div>
  );

export default FilterBrand;
