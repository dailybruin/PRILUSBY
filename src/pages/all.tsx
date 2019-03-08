import * as React from 'react'
import { graphql } from 'gatsby'

import CustomHeader from '../components/CustomHeader'
import { QuarterlyStories } from '../components/QuarterlyStories'
import { css } from 'emotion'
import { Footer } from '../components/Footer'

export const query = graphql`
  query {
    issues {
      issues {
        term
        coverphoto
        articles
      }
    }
    allPrimeArticle {
      edges {
        node {
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
  let quarterlyStories = data.issues.issues.map(issue => {
    let term = issue.term
    let season = term.substring(0, term.length - 2)
    let year = '20' + term.substring(term.length - 2, term.length)
    return {
      quarter: season + ' ' + year,
      stories: issue.articles.map(slug => {
        const curredge = data.allPrimeArticle.edges.filter(edge => {
          return edge.node.slug === slug
        })[0]
        const currArticle = curredge.node
        const aType = currArticle.articleType
        return {
          title: currArticle.headline,
          authors: [currArticle.author],
          description: currArticle.excerpt,
          quarter: season + ' ' + year,
          imageURL: '' + currArticle.coverimg,
          link:
            aType !== 'article' && aType !== 'graphic'
              ? aType
              : `/${slug.split('.').join('')}`,
        }
      }),
    }
  })
  return (
    <div>
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
