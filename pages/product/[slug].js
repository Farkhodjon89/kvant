import { useState } from 'react';
import Layout from '../../components/Layout/layout';
import CategoriesBar from '../../components/CategoriesBar/categories-bar';
import Breadcrumbs from '../../components/Breadcrumbs/breadcrumbs';
import ProductCard from '../../components/ProductCard/product-card';
// import ProductsList from '../../components/ProductsList/products-list';
import client from '../../apollo/apollo-client';
import PRODUCT from '../../queries/product';
import PRODUCTS from '../../queries/products';
import { connect } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/actions/cartActions';
import { addToWishlist, deleteFromWishlist } from '../../redux/actions/wishlistActions';
import { StaticDataSingleton } from '../../utils/staticData';
import ProductSlider from '../../components/ProductSlider';

const Product = ({
  categories,
  category,
  product,
  cartItems,
  wishlistItems,
  addToCart,
  deleteFromCart,
  addToWishlist,
  deleteFromWishlist,
}) => {
  const [cartModal, setCartModal] = useState(false);

  const breadcrumbs = [
    {
      name: 'Главная',
      link: '/',
    },
    {
      name: category.name,
      link: `/catalog/${category.slug}`,
    },
    {
      name: product.name,
      link: `/product/${product.slug}`,
    },
  ];

  return (
    <Layout categories={categories} cartModal={cartModal} setCartModal={setCartModal}>
      {/*<CategoriesBar categories={categories} />*/}
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <ProductCard
        product={product}
        cartItems={cartItems}
        wishlistItems={wishlistItems}
        addToCart={addToCart}
        deleteFromCart={deleteFromCart}
        addToWishlist={addToWishlist}
        deleteFromWishlist={deleteFromWishlist}
        setCartModal={setCartModal}
      />
      <ProductSlider
        wishlistItems={wishlistItems}
        products={product.related.nodes}
        related={true}
        text={`Возможно заинтересуют`}
      />
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  let response;
  try {
    response = await client.query({
      query: PRODUCT,
      variables: { id: params.slug },
    });
  } catch (e) {
    return {
      notFound: true,
    };
  }

  const products = await client.query({
    query: PRODUCTS,
    variables: { first: 9, featured: true },
  });

  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch();
  const categories = staticData.getRootCategories();
  const category =
    response.data.product.productCategories.nodes.length !== 0
      ? response.data.product.productCategories.nodes[0]?.slug === 'uncategorized'
        ? ''
        : staticData.getCategoryBySlug(response.data.product.productCategories.nodes[0].slug, 2)
      : '';

  return {
    props: {
      categories,
      category,
      product: response.data.product,
    },
  };
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, selectedProductId) => {
      dispatch(addToCart(item, selectedProductId));
    },
    deleteFromCart: (item) => {
      dispatch(deleteFromCart(item));
    },
    addToWishlist: (item) => {
      dispatch(addToWishlist(item));
    },
    deleteFromWishlist: (item) => {
      dispatch(deleteFromWishlist(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
