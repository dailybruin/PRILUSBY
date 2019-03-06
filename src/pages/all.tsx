import * as React from 'react'
import { graphql, navigate } from 'gatsby'

import CustomHeader from '../components/CustomHeader'
import { QuarterlyStories } from '../components/QuarterlyStories'
import { css, cx } from 'emotion'
import { Footer } from '../components/Footer'

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

export const query = graphql`
  query {
    issues {
      issues {
        term
        coverphoto
      }
    }
    allPrimeArticle {
      edges {
        node {
          title
          slug
          headline
          author
          authorbio
          authoremail
          authortwitter
          coverimg
          covercred
          coveralt
          articleType
          excerpt
        }
      }
    }
  }
`
const AllStories = ({ data }) => {
  if (typeof window == 'undefined') {
    return null
  }
  navigate('/winter19')
  return (
    <div>
      {console.log(data)}
      <CustomHeader />
      <div
        className={css`
          margin: 20px;
          margin-top: 50px;
          margin-bottom: 100px;
        `}
      >
        <QuarterlyStories quarters={quarterlyStories} />
      </div>
      <Footer />
    </div>
  )
}

export default AllStories
