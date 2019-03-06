import * as React from 'react'
import { graphql, navigate } from 'gatsby'
import { Head } from '@dailybruin/lux'
import { Footer } from '../components/Footer'
import GraphicNovel from '../components/GraphicNovel'
import CustomHeader from '../components/CustomHeader'
import { ArticleCard } from '../components/ArticleCard'
import { css } from 'emotion'

import { TitleGallery } from '../components/TitleGallery'

import { ThreeArticleCardRow } from '../components/ThreeArticleCardRow'
import { TwoArticleCardRow } from '../components/TwoArticleCardRow'

import F18prime from '../images/prime.f18.cover.png'

// export const query = graphql`
//   query {
//     issue {
//       term
//       title
//       coverphoto
//       articles
//     }
//   }
// `

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

const whykarl = [
  {
    title: 'titleeeee',
    caption: 'caption here',
    imageSrc:
      'https://upload.wikimedia.org/wikipedia/commons/4/4b/What_Is_URL.jpg',
    href: '/',
  },
  {
    title: 'title',
    caption: 'caption here',
    imageSrc:
      'https://ichef.bbci.co.uk/news/660/cpsprodpb/6EB0/production/_103963382_adder2.jpg',
    href: '/',
  },
  {
    title: 'title',
    caption: 'caption here',
    imageSrc:
      'https://ichef.bbci.co.uk/news/660/cpsprodpb/6EB0/production/_103963382_adder2.jpg',
    href: '/',
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
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/1024px-Solid_white.svg.png',
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

const IndexPage = ({ data }) => {
  if (typeof window == 'undefined') {
    return null
  }
  navigate('/winter19')
  if (typeof document == 'undefined') {
    return null
  }
  return (
    <>
      <CustomHeader transparent={true} />
      <TitleGallery stories={stories} />
      <div
        className={css`
          height: 20px;
        `}
      />
      <ThreeArticleCardRow cards={whykarl} term={'winter19'} />
      <TwoArticleCardRow
        cards={whykarl}
        term={'fall18'}
        title="facing tomorrow"
      />
      <Footer />
    </>
  )
}

export default IndexPage
