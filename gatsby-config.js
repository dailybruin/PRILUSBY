const slugify = require('slugify')

const siteName = 'PRIME'
const description =
  "PRIME is the official website for the Daily Bruin's quarterly arts, culture and lifestyle magazine."
const image =
  'http://assets.dailybruin.com/images/prime.map.articles.to.issues/prime%20cover%20spring.jpg'
const year = '2019'

const url = `https://features.dailybruin.com/${year}/${slugify(siteName)}`

module.exports = {
  siteMetadata: {
    siteName,
    description,
    url,
    image,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteName,
        short_name: siteName,
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'browser',
        icon: 'src/images/db-logo.png',
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    // {
    //   resolve: 'gatsby-plugin-google-analytics',
    //   options: {
    //     trackingId: 'UA-28181852-23',
    //     head: false,
    //     anonymize: true,
    //   },
    // },
    {
      resolve: 'gatsby-plugin-gtag',
      options: {
        trackingId: 'G-1D4G812DSQ', 
        head: true,             
        anonymize: true,         
      },
    },
  ],
}
