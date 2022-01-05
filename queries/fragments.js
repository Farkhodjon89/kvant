import gql from 'graphql-tag';

export const _Product = gql`
  fragment _Product on Product {
    id
    databaseId
    sku
    slug
    name
    onSale
    type
    featured
    status
    description
    image {
      sourceUrl
    }
    galleryImages {
      nodes {
        sourceUrl
      }
    }

    productCategories(where: { orderby: TERM_ID }) {
      nodes {
        name
        slug
      }
    }
  }
`;

export const _SimpleProduct = gql`
  fragment _SimpleProduct on SimpleProduct {
    id
    databaseId
    stockQuantity
    woocsRegularPrice
    woocsSalePrice
    paBrands {
      nodes {
        id
        link
        name
      }
    }
  }
`;

export const _VariableProduct = gql`
  fragment _VariableProduct on VariableProduct {
    id
    databaseId
    woocsRegularPrice
    woocsSalePrice
    productTags {
      nodes {
        count
        name
      }
    }
    variations(where: { stockStatus: IN_STOCK }) {
      nodes {
        id
        databaseId
        stockQuantity
        sku
        name
        image {
          sourceUrl
        }
      }
    }
    paBrands {
      nodes {
        id
        name
        link
      }
    }
  }
`;
