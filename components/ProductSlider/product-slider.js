import Slider from 'react-slick';
import icons from '../../public/fixture';
import s from './product-slider.module.scss';
import ProductsList from '../ProductsList/products-list';
import ProductsListItem from '../ProductsListItem/products-list-item';
import { connect } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/actions/cartActions';
import { addToWishlist, deleteFromWishlist } from '../../redux/actions/wishlistActions';

const SliderPrevArrow = (props) => (
  <button
    className="sliderPrevArrow"
    onClick={props.onClick}
    dangerouslySetInnerHTML={{ __html: icons.arrowLeft }}
  />
);

const SliderNextArrow = (props) => (
  <button
    className="sliderNextArrow"
    onClick={props.onClick}
    dangerouslySetInnerHTML={{ __html: icons.arrowRight }}
  />
);

const settings = {
  infinite: true,

  slidesToShow: 3,
  slidesToScroll: 3,

  prevArrow: <SliderPrevArrow />,
  nextArrow: <SliderNextArrow />,
  responsive: [
    {
      breakpoint: 770,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: false,
      },
    },
  ],
};

const ProductSlider = ({ products, text, wishlistItems, addToWishlist, deleteFromWishlist }) => {
  const productList = [];

  for (const product of products) {
    productList.push(<ProductsListItem slider={'slider'} product={product} />);
  }

  return (
    <>
      <h1 className={s.productSliderTitle} style={{ marginBottom: '3rem' }}>
        {text}
      </h1>
      <section className={s.productSlider}>
        <Slider {...settings}>{productList}</Slider>
      </section>
    </>
  );
};

export default ProductSlider;
