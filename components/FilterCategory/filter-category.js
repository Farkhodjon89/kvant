import Accordion from '../Accordion/accordion';
import icons from '../../public/fixture';

import s from './filter-category.module.scss';

const FilterCategory = ({ category, categories }) => {
  console.log(categories)
  return(
      <div>
        <div className={s.title}>
          Категории
          <span dangerouslySetInnerHTML={{__html: icons.arrowDown}}/>
        </div>
        <div className={s.accordion}>
          {categories.map(({name, slug, children}) => (
              <Accordion name={name} child={slug} key={name}>
                {children}
              </Accordion>
          ))}
        </div>
      </div>
  )
};
export default FilterCategory;
