import Layout from '../../components/Layout/layout';
import Breadcrumbs from '../../components/Breadcrumbs/breadcrumbs';
import Catalog from '../../components/CatalogMain/catalog-main';
import client from '../../apollo/apollo-client';
import PRODUCTS from '../../queries/products';
import { StaticDataSingleton } from '../../utils/staticData';

const CatalogPage = ({ pageInfo, products, category, categories, activeTerms }) => {

  const breadcrumbs = [
    {
      name: 'Главная',
      link: '/',
    },
    {
      name: 'Каталог',
      link: `/catalog`,
    },
  ];

  return (
    <>
      <Layout categories={categories}>
        <div className="container">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <Catalog
            products={products}
            categories={categories}
            pageInfo={pageInfo}
            category={category}
            activeTerms={activeTerms}
          />
        </div>
      </Layout>
    </>
  );
};

export default CatalogPage;

export async function getServerSideProps() {
  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch();

  const categories = staticData.getRootCategories();

  const products = await client.query({
    fetchPolicy: 'no-cache',
    query: PRODUCTS,
    variables: { first: 9 },
  });

  return {
    props: {
      products: products.data.products.nodes,
      pageInfo: products.data.products.pageInfo,
      activeTerms: products.data.products.activeTerms,
      categories,
    },
  };
}
