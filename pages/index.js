import Layout from '../components/Layout/layout';
import CategoriesBar from '../components/CategoriesBar/categories-bar';
import BaseSlider from '../components/BaseSlider/base-slider';
import BaseBlocks from '../components/BaseBlocks/base-blocks';
import ProductsList from "../components/ProductsList/products-list";
import BaseBrands from '../components/BaseBrands/base-brands';
import client from '../apollo/apollo-client';
import PRODUCTS from '../queries/products';
import { StaticDataSingleton } from '../utils/staticData';
import CategoriesSlider from '../components/CategoriesSlider/categories-slider';
import { HOME_PAGE } from '../queries/globalSettings';
import BlockWrapper from '../components/BlockWrapper/BlockWrapper';
import Brands from '../components/Brands/Brands';
import ProductSlider from '../components/ProductSlider';

export default function Base({
  categories,
  category,
  products,
  slides,
  homeCategories,
  featuredProducts,
  taggedProducts,
  banners,
  offers,
  brands,
}) {
  return (
    <Layout categories={categories}>
      <BaseSlider data={slides} />
      <CategoriesBar categories={categories}  />
      <ProductsList products={products} title={'Новинки'} />
      {/* <CategoriesSlider categories={homeCategories} /> */}
      {/* <BlockWrapper offers={offers} /> */}
      {/*<BaseBlocks category={category} />*/}
      <BaseBrands banners={banners[0]} />
      <ProductsList products={featuredProducts} title={'Суперцены'} />
      <BaseBrands banners={banners[1]} />
      {/* <ProductSlider products={products} text={`Новинки`} />
      <ProductSlider products={products} text={`Бестселлеры`} />
      <Brands brands={brands} /> */}
      <ProductsList products={taggedProducts} title={'Со скидкой'}/>
    </Layout>
  );
}

export async function getStaticProps() {
  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch(true);
  const categories = staticData.getRootCategories();

  const products = await client.query({
    query: PRODUCTS,
    variables: { first: 6 },
  });
  const homePageData = await client.query({
    query: HOME_PAGE,
  });

  const featuredProducts = await client.query({
    query: PRODUCTS,
    variables: { first: 6, featured: true },
  });

  const taggedProducts = await client.query({
    query: PRODUCTS,
    variables: { first: 3, tag: 'tagged' },
  });

  return {
    props: {
      categories,
      slides: homePageData.data.themeGeneralSettings.globalOptions.slider,
      products: products.data.products.nodes,
      taggedProducts: taggedProducts.data.products.nodes,
      featuredProducts: featuredProducts.data.products.nodes,
      // homeCategories: homePageData.data.themeGeneralSettings.globalOptions?.categories,
      banners: homePageData.data.themeGeneralSettings.globalOptions.banners,
      // offers: homePageData.data.themeGeneralSettings.globalOptions?.offers,
      // brands: homePageData.data.themeGeneralSettings.globalOptions?.brands,
    },
    revalidate: 60,
  };
}
