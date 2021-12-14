module.exports = {
  siteMetadata: {
    siteUrl: 'https://bryanbarrows.me',
    name: "Bryan Barrows",
    defaultTitle: "Bryan Barrows",
    titleTemplate: "%s • Bryan Barrows",
    description: "The blog and website of Bryan Barrows, Workflows Advocate at Okta, based in Seattle WA",
    author: {
      name: "Bryan Barrows",
      link: "https://bryanbarrows.me",
      email: "bryanbarrows@live.com"
    },
    hero: {
      heading: "Bryan Barrows",
      subHeading: "Workflows Advocate at Okta - Based in Seattle, WA",
    },
    social: [
      {
        name: "twitter",
        url: "https://twitter.com/bryanbarrows",
      },
      {
        name: "linkedin",
        url: "https://linkedin.com/in/bbarrows89",
      },
      {
        name: "devto",
        url: "https://dev.to/bryanbarrows",
      },
      {
        name: "youtube",
        url: "https://www.youtube.com/channel/UCGXRZbU_2IWFF7KopaVO02g",
      },
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-theme-purist',
      options: {
        contentBase: 'content',
        basePath: '/',
        featuredArticleLimit: 2,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Bryan Barrows`,
        short_name: `Bryan Barrows`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: 'src/gatsby-theme-purity/components/Logo/favicon.svg',
        cache_busting_mode: 'none'
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/content/articles`,
        ignore: [`**/drafts`]
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
                author {
                  name
                  link
                  email
                }
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  author: site.siteMetadata.name,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }]
                });
              });
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] }, filter: {frontmatter: { draft: {eq: false} }}
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                        description
                        author
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Bryan Barrows RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/articles/"
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
         workboxConfig: {
            globPatterns: ['**/icon-path*']
        }
      }
    }
  ],
}
