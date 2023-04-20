import * as React from 'react'
import { graphql } from 'gatsby'
import CustomHead from '../components/CustomHead'
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
    return (
      <>
        <CustomHead
          siteName="PRIME"
          pageName="all stories"
          url="https://prime.dailybruin.com/all"
          description="PRIME is the official website for the Daily Bruin's quarterly arts, culture and lifestyle magazine."
          image="https://assets.dailybruin.com/images/sabrina.whensoundshurt/cover-83530e07fd73cf3d7e1c8b5a85639df2.jpg"
        />
      </>
    )
  }
  console.log(`Printing out data`)
  console.log(data)
  let quarterlyStories = data.issues.issues.map(issue => {
    let term = issue.term
    let season = term.substring(0, term.length - 2)
    let year = '20' + term.substring(term.length - 2, term.length)
    return {
      quarter: season + ' ' + year,
      stories: issue.articles
        .filter(slug => {
          // just in case something is undefined filter so page doesn't crash
          const curredge = data.allPrimeArticle.edges.filter(edge => {
            return edge.node.slug === slug
          })[0]
          return !(curredge === undefined || curredge.node === undefined)
        })
        .map(slug => {
          const curredge = data.allPrimeArticle.edges.filter(edge => {
            return edge.node.slug === slug
          })[0]
          return curredge.node
        }),
    }
  })
  return (
    <>
      <CustomHead
        siteName="PRIME"
        pageName="all stories"
        url="https://prime.dailybruin.com/all"
        description="PRIME is the official website for the Daily Bruin's quarterly arts, culture and lifestyle magazine."
        image="https://assets.dailybruin.com/images/sabrina.whensoundshurt/cover-83530e07fd73cf3d7e1c8b5a85639df2.jpg"
      />
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
    </>
  )
}

export default AllStories
