import * as React from 'react'
import { graphql } from 'gatsby'
import {
  Article,
  CoverPhoto,
  Head,
  XPosition,
  YPosition,
} from '@dailybruin/lux'
import { Footer } from '../components/Footer'
import GraphicNovel from '../components/GraphicNovel'
import CustomHeader from '../components/CustomHeader'
import { ArticleCard } from '../components/ArticleCard'
import { css } from 'emotion'

import { TitleGallery } from '../components/TitleGallery'
import { StyledCoverPhoto } from '../components/StyledCoverPhoto'
import { FooterAuthorBio } from '../components/FooterAuthorBio'
import { QuarterlyStories } from '../components/QuarterlyStories'

import { CustomPullQuote } from '../components/pullQuote'
import { CustomPullImage } from '../components/pullImage'

import { TripleHeader } from '../components/TripleHeader/TripleHeader'
import { HeaderHighLight } from '../components/headerHeadLight'
import { ThreeArticleCardRow } from '../components/ThreeArticleCardRow'
import { TwoArticleCardRow } from '../components/TwoArticleCardRow'
import { ArticleGrid } from '../components/ArticleGrid'

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

const quarterlyStories = [
  {
    quarter: 'Fall 2018',
    stories: [
      {
        title: 'The Road to Royce',
        authors: ['John Tudhope'],
        description:
          'A description of the story goes here. It should be about two sentence and probably this long and maybe even longer like this.',
        quarter: 'Fall 2018',
        imageURL:
          'https://ichef.bbci.co.uk/news/660/cpsprodpb/6EB0/production/_103963382_adder2.jpg',
      },
      {
        title: 'Song Sot/Survival',
        authors: ['Kristie-Valerie Hoang'],
        description:
          'A description of the story goes here. It should be about two sentence and probably this long and maybe even longer like this.',
        quarter: 'Winter 2018',
        imageURL:
          'https://s3.amazonaws.com/images.seroundtable.com/google-submit-url-1516800645.jpg',
      },
      {
        title: 'The Road to Royce',
        authors: ['John Tudhope'],
        description:
          'A description of the story goes here. It should be about two sentence and probably this long and maybe even longer like this.',
        quarter: 'Fall 2018',
        imageURL:
          'https://ichef.bbci.co.uk/news/660/cpsprodpb/6EB0/production/_103963382_adder2.jpg',
      },
      {
        title: 'Song Sot/Survival',
        authors: ['Kristie-Valerie Hoang'],
        description:
          'A description of the story goes here. It should be about two sentence and probably this long and maybe even longer like this.',
        quarter: 'Winter 2018',
        imageURL:
          'https://s3.amazonaws.com/images.seroundtable.com/google-submit-url-1516800645.jpg',
      },
    ],
  },
  {
    quarter: 'Winter 2019',
    stories: [
      {
        title: 'YETEETET',
        authors: ['John Tudhope'],
        description:
          'A description of the story goes here. A description of the story goes here. A description of the story goes here. A description of the story goes here. It should be about two sentence and probably this long and maybe even longer like this.',
        quarter: 'Fall 2018',
        imageURL:
          'https://ichef.bbci.co.uk/news/660/cpsprodpb/6EB0/production/_103963382_adder2.jpg',
      },
      {
        title: 'Song Sot/Survival',
        authors: ['Kristie-Valerie Hoang'],
        description:
          'A description of the story goes here. It should be about two sentence and probably this long and maybe even longer like this.',
        quarter: 'Winter 2018',
        imageURL:
          'https://s3.amazonaws.com/images.seroundtable.com/google-submit-url-1516800645.jpg',
      },
    ],
  },
]

const stories = [
  {
    title: 'The Road to Royce',
    authors: ['John Tudhope'],
    description:
      'A description of the story goes here. It should be about two sentence and probably this long and maybe even longer like this.',
    quarter: 'Fall 2018',
    imageURL:
      'https://ichef.bbci.co.uk/news/660/cpsprodpb/6EB0/production/_103963382_adder2.jpg',
  },
  {
    title: 'Song Sot/Survival',
    authors: ['Kristie-Valerie Hoang'],
    description:
      'A description of the story goes here. It should be about two sentence and probably this long and maybe even longer like this.',
    quarter: 'Winter 2018',
    imageURL:
      'https://s3.amazonaws.com/images.seroundtable.com/google-submit-url-1516800645.jpg',
  },
]

const articleCards = [
  <ArticleCard
    blackCardFontSize={1}
    whiteCardFontSize={0.8}
    blackCardText="Song Sot/Survival"
    whiteCardText={
      'A description of the story goes here. It should be about \
  two sentences and probably about this long and maybe even longer like this.'
    }
    imageSrc="https://ampbyexample.com/img/canoe_900x600.jpg"
    href="/"
    imageHeightVW={30}
  />,
  <ArticleCard
    blackCardFontSize={1}
    whiteCardFontSize={0.8}
    blackCardText="Song Sot/Survival"
    whiteCardText={
      'A description of the story goes here. It should be about \
  two sentences and probably about this long and maybe even longer like this.'
    }
    imageSrc="https://ampbyexample.com/img/canoe_900x600.jpg"
    href="/"
    imageHeightVW={30}
  />,
  <ArticleCard
    blackCardFontSize={1}
    whiteCardFontSize={0.8}
    blackCardText="Song Sot/Survival"
    whiteCardText={
      'A description of the story goes here. It should be about \
  two sentences and probably about this long and maybe even longer like this.'
    }
    imageSrc="https://ampbyexample.com/img/canoe_900x600.jpg"
    href="/"
    imageHeightVW={30}
  />,
  <ArticleCard
    blackCardFontSize={1}
    whiteCardFontSize={0.8}
    blackCardText="Song Sot/Survival"
    whiteCardText={
      'A description of the story goes here. It should be about \
  two sentences and probably about this long and maybe even longer like this.'
    }
    imageSrc="https://ampbyexample.com/img/canoe_900x600.jpg"
    href="/"
    imageHeightVW={30}
  />,
]
const IndexPage = ({ data }) => (
  <>
    <TitleGallery stories={stories} />
    <TripleHeader
      title={'winter 2019'}
      description={
        'Description about what this issue is about goes here. Description about what this issue is about goes here. Description about what this issue is about goes here.'
      }
      imageURL={
        'https://ichef.bbci.co.uk/news/660/cpsprodpb/6EB0/production/_103963382_adder2.jpg'
      }
    />
    <CustomHeader transparent={true} />
    <QuarterlyStories quarters={quarterlyStories} />
    <StyledCoverPhoto
      title="The Road to Royce"
      authors={['John Tudhope']}
      description="A description of the story goes here. It should be about two sentence and probably this long and maybe even longer like this."
      quarter="Fall 2018"
      imageURL="https://ichef.bbci.co.uk/news/660/cpsprodpb/6EB0/production/_103963382_adder2.jpg"
      photographers={['Max Wu', 'Yeet']}
    />
    <ArticleGrid>{articleCards}</ArticleGrid>
    <FooterAuthorBio
      name="Kristie-Valerie Hoang"
      email="khoang@dailybruin.com"
      handle="@KristieHoang DB"
      bio="Hoang is a third-year political science major. She is the Social Media director at the Daily Bruin."
    />
    <Head {...data.site.siteMetadata} />
    <GraphicNovel />
    <Article dropcap={true} content={data.kerckhoffArticle.content} />
    {/* <CustomPullImage
      url="https://assets.dailybruin.com/images/interactive.prime.2018.teddy/web.prime.homelessness.missmary.ADX-e4d9cf1515feb0181473bb868a1c2374.JPG"
      caption="Miss Mary"
      credit="Karl Huang"
      alt="A picture of Miss Mary, a homeless woman who lives in Westwood. She is wearing a beanie and a dark sweatshirt."
    />

    <CustomPullQuote caption="Every day, they rejected his offers of help. Everyday, they reject his offers of help. Everyday, they reject his" /> */}
    <ThreeArticleCardRow
      cards={[
        {
          title: 'Song Sot/Survival',
          caption:
            'A description of the story goes here. It should be about \
        two sentences and probably about this long and maybe even longer like this.',
          imageSrc: 'https://ampbyexample.com/img/canoe_900x600.jpg',
          href: '/',
        },
        {
          title: 'Song Sot/Survival',
          caption:
            'A description of the story goes here. It should be about \
        two sentences and probably about this long and maybe even longer like this.',
          imageSrc:
            'https://i.kym-cdn.com/photos/images/newsfeed/001/295/524/cda.jpg',
          href: '/',
        },
        {
          title: 'Song Sot/Survival',
          caption:
            'A description of the story goes here. It should be about \
        two sentences and probably about this long and maybe even longer like this.',
          imageSrc: 'https://ampbyexample.com/img/green_apple_1_1024x682.jpg',
          href: '/',
        },
      ]}
    />
    <TwoArticleCardRow
      cards={[
        {
          title: 'Song Sot/Survival',
          caption:
            'A description of the story goes here. It should be about \
        two sentences and probably about this long and maybe even longer like this.',
          imageSrc: 'https://ampbyexample.com/img/canoe_900x600.jpg',
          href: '/',
        },
        {
          title: 'Song Sot/Survival',
          caption:
            'A description of the story goes here. It should be about \
        two sentences and probably about this long and maybe even longer like this.',
          imageSrc:
            'https://i.kym-cdn.com/photos/images/newsfeed/001/295/524/cda.jpg',
          href: '/',
        },
      ]}
    />
    <Footer />
  </>
)

export default IndexPage
