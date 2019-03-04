import * as React from 'react'
import { graphql } from 'gatsby'
import {
  Article,
  CoverPhoto,
  Footer,
  Head,
  XPosition,
  YPosition,
} from '@dailybruin/lux'

import { CustomPullQuote } from '../components/pullQuote'
import { CustomPullImage } from '../components/pullImage'

import { HeaderHighLight } from '../components/headerHeadLight'

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteName
        description
        url
        image
      }
    }
    kerckhoffArticle {
      headline
      author
      content {
        type
        value
      }
    }
  }
`
const IndexPage = ({ data }) => (
  <>
    <Head {...data.site.siteMetadata} />
    <CoverPhoto
      headline={data.kerckhoffArticle.headline}
      authors={data.kerckhoffArticle.author}
      imageURL="https://chancellor.ucla.edu/wp-content/uploads/2018/07/ChancellorBlock_1366x912_acf_cropped.jpg"
      xPosition={XPosition.Center}
      yPosition={YPosition.Center}
    />
    <Article dropcap={true} content={data.kerckhoffArticle.content} />
    <HeaderHighLight/> 
    {/* <CustomPullImage
      url="https://assets.dailybruin.com/images/interactive.prime.2018.teddy/web.prime.homelessness.missmary.ADX-e4d9cf1515feb0181473bb868a1c2374.JPG"
      caption="Miss Mary"
      credit="Karl Huang"
      alt="A picture of Miss Mary, a homeless woman who lives in Westwood. She is wearing a beanie and a dark sweatshirt."
    />

    <CustomPullQuote caption="Every day, they rejected his offers of help. Everyday, they reject his offers of help. Everyday, they reject his" /> */}
    <Footer developers="Nathan Smith" copyrightYear={2018} />
  </>
)

export default IndexPage
