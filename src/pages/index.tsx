import * as React from 'react'
import { graphql } from 'gatsby'
import { Head } from '@dailybruin/lux'
import { Footer } from '../components/Footer'
import GraphicNovel from '../components/GraphicNovel'
import CustomHeader from '../components/CustomHeader'
import { ArticleCard } from '../components/ArticleCard'
import { css } from 'emotion'

import { TitleGallery } from '../components/TitleGallery'
import { StyledCoverPhoto } from '../components/StyledCoverPhoto'
import { FooterAuthorBio } from '../components/FooterAuthorBio'
import { QuarterlyStories } from '../components/QuarterlyStories'
import { HeaderHighLight } from '../components/TripleHeader/HeaderHighLight'
import { CustomPullQuote } from '../components/pullQuote'
import { CustomPullImage } from '../components/pullImage'

import { TripleHeader } from '../components/TripleHeader/TripleHeader'
import { ThreeArticleCardRow } from '../components/ThreeArticleCardRow'
import { TwoArticleCardRow } from '../components/TwoArticleCardRow'
import { ArticleGrid } from '../components/ArticleGrid'

import { CoverGallery } from '../components/CoverGallery'
import F18prime2 from '../images/prime.f18.cover 2.1.png'
import F18prime from '../images/prime.f18.cover.png'

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

const CoverPhotos = [
  {
    photoURL: F18prime,
    URL: 'https://www.linkedin.com/in/maxcwu/',
  },
  {
    photoURL: F18prime,
    URL: 'https://www.linkedin.com/in/maxcwu/',
  },
  {
    photoURL: F18prime,
    URL: 'https://www.linkedin.com/in/maxcwu/',
  },
  {
    photoURL: F18prime,
    URL: 'https://www.linkedin.com/in/maxcwu/',
  },
  {
    photoURL: F18prime,
    URL: 'https://www.linkedin.com/in/maxcwu/',
  },
]

const stories = [
  {
    photoURL: F18prime,
    URL: 'https://www.linkedin.com/in/maxcwu/',
  },
  {
    photoURL: F18prime,
    URL: 'https://www.linkedin.com/in/maxcwu/',
  },
  {
    photoURL: F18prime,
    URL: 'https://www.linkedin.com/in/maxcwu/',
  },
  {
    photoURL: F18prime,
    URL: 'https://www.linkedin.com/in/maxcwu/',
  },
  {
    photoURL: F18prime,
    URL: 'https://www.linkedin.com/in/maxcwu/',
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

const IndexPage = ({ data }) => (
  <>
    <CustomHeader transparent={false} />
    <QuarterlyStories quarters={quarterlyStories} />

    <FooterAuthorBio
      name="Kristie-Valerie Hoang"
      email="khoang@dailybruin.com"
      handle="@KristieHoang DB"
      bio="Hoang is a third-year political science major. She is the Social Media director at the Daily Bruin."
    />
    <Head {...data.site.siteMetadata} />
    <GraphicNovel />
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
    <HeaderHighLight
      title="testing"
      highlightPosition="top"
      textAlign="right"
      fullWidth={true}
    />
    <div
      className={css`
        display: flex;
        justify-content: space-around;
      `}
    >
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
        wrapperWidthVW={33}
        imgWidthVW={30}
      />
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
        wrapperWidthVW={33}
        imgWidthVW={30}
      />
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
        wrapperWidthVW={33}
        imgWidthVW={30}
      />
    </div>
    <div
      className={css`
        display: flex;
        justify-content: space-around;
      `}
    >
      <ArticleCard
        blackCardFontSize={1.2}
        whiteCardFontSize={1}
        blackCardText="Song Sot/Survival"
        whiteCardText={
          'A description of the story goes here. It should be about \
        two sentences and probably about this long and maybe even longer like this.'
        }
        imageSrc="https://ampbyexample.com/img/canoe_900x600.jpg"
        href="/"
        wrapperWidthVW={41}
        imgWidthVW={40}
      />
      <ArticleCard
        blackCardFontSize={1.2}
        whiteCardFontSize={1}
        blackCardText="This is supposed to be a super long title and I have no idea what it should eventually land but I and growing paranoid and this is looking pretty bad, DUH!"
        whiteCardText={
          'A description of the story goes here. It should be about \
        two sentences and probably about this long and maybe even longer like this.'
        }
        imageSrc="https://ampbyexample.com/img/canoe_900x600.jpg"
        href="/"
        wrapperWidthVW={41}
        imgWidthVW={40}
      />
    </div>
    <Footer />
  </>
)

export default IndexPage
