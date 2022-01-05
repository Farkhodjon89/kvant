import Breadcrumbs from '../components/Breadcrumbs/breadcrumbs';
import Layout from '../components/Layout/layout';
import WishlistMain from '../components/WishlistMain/wishlist-main';
import { StaticDataSingleton } from '../utils/staticData';

const Wishlist = ({ categories }) => {
  const breadcrumbs = [
    {
      name: 'Главная',
      link: '/',
    },
    {
      name: 'Избранные товары',
      link: '/wishlist',
    },
  ];

  return (
    <Layout categories={categories}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <WishlistMain />
    </Layout>
  );
};

export async function getStaticProps() {
  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch(true);

  const categories = staticData.getRootCategories();

  return {
    props: {
      categories: categories,
    },
    revalidate: 60,
  };
}

export default Wishlist;
