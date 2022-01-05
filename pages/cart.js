import Layout from '../components/Layout/layout';
import CartMain from '../components/CartMain/cart-main';
import { StaticDataSingleton } from '../utils/staticData';
import Breadcrumbs from '../components/Breadcrumbs/breadcrumbs';

export default function Cart({ categories, category }) {
  const breadcrumbs = [
    {
      name: 'Главная',
      link: '/',
    },

    {
      name: 'Корзина',
      link: `/cart`,
    },
  ];

  return (
    <Layout categories={categories}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <CartMain />
    </Layout>
  );
}

export async function getStaticProps() {
  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch(true);
  const categories = staticData.getRootCategories();
  return {
    props: {
      categories,
    },
    revalidate: 60,
  };
}
