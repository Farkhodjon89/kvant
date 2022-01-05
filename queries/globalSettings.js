import gql from 'graphql-tag';

export const HOME_PAGE = gql`
  query HomePage {
    themeGeneralSettings {
      globalOptions {
        slider {
          id
          button
          subtitle
          subtitle2
          title
          url
          image {
            sourceUrl
          }
          mobimage {
            sourceUrl
          }
        }
        banners {
          id
          title
          button
          url
          mobimage {
            sourceUrl
          }
          image {
            sourceUrl
          }
        }
        brands {
          url
          id
          name
          image {
            sourceUrl
          }
          mobimage {
            sourceUrl
          }
        }
      }
    }
  }
`;

// export const HOME_PAGE = gql`
//   query HomePage {
//     themeGeneralSettings {
//       globalOptions {
//         slider {
//         button
//         subtitle
//         subtitle2
//         title
//         url
//         image {
//           sourceUrl
//         }
//         mobimage {
//           sourceUrl
//         }
//       }
//         categories {
//           title
//           url
//           image {
//             sourceUrl
//           }
//         }
//         offers {
//         url
//         image {
//           sourceUrl
//         }
//         mobimage {
//           sourceUrl
//         }
//         subtitle
//         title
//         button
//       }
//         banners {
//         title
//         button
//         subtitle
//         url
//         mobimage {
//           sourceUrl
//         }
//         image {
//           sourceUrl
//         }
//       }
//       brands {
//         url
//         image {
//           sourceUrl
//         }
//         mobimage {
//           sourceUrl
//         }
//       }
//       }
//     }
//   }
// `
