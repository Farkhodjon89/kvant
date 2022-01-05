import gql from 'graphql-tag';
import { _Product, _SimpleProduct, _VariableProduct } from './fragments';

const PRODUCTS = gql`
  query PRODUCTS(
    $first: Int
    $after: String
    $categories: [String]
    $filters: [ProductTaxonomyFilterInput]
    $onSale: Boolean
    $featured: Boolean
    $search: String
    $orderBy: [ProductsOrderbyInput]
    $tag: String
  ) {
    products(
      first: $first
      after: $after
      where: {
        status: "publish"
        stockStatus: IN_STOCK
        onSale: $onSale
        categoryIn: $categories
        taxonomyFilter: { and: $filters }
        search: $search
        orderby: $orderBy
        featured: $featured
        tag: $tag
      }
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      activeTerms {
        paBrands {
          slug
          name
        }
      }
      nodes {
        ..._Product
        ... on SimpleProduct {
          ..._SimpleProduct
        }
        ... on VariableProduct {
          ..._VariableProduct
        }
      }
    }
  }

  ${_Product}
  ${_SimpleProduct}
  ${_VariableProduct}
`;

export default PRODUCTS;
