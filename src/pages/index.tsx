import * as React from 'react'
import { graphql } from 'gatsby'
import CustomHead from '../components/CustomHead'
import { Footer } from '../components/Footer'
import CustomHeader from '../components/CustomHeader'
import { ArticleCard } from '../components/ArticleCard'
import { css } from 'emotion'

import { TitleGallery } from '../components/TitleGallery'

import { ThreeArticleCardRow } from '../components/ThreeArticleCardRow'
import { TwoArticleCardRow } from '../components/TwoArticleCardRow'

export const query = graphql`
  query {
    issues {
      issues {
        term
        title
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

const IndexPage = ({ data }) => {
  if (typeof window == 'undefined') {
    return (
      <>
        <CustomHead
          siteName="PRIME"
          pageName="all stories"
          url="https://prime.dailybruin.com/all"
          description="PRIME is the official website for the Daily Bruin's quarterly arts, culture, and lifestyle magazine."
          image="https://assets.dailybruin.com/images/prime.map.articles.to.issues/PRIME.thumbnail-cf84048a01d52fbc0582220cf04779ad.jpg"
        />
      </>
    )
  }
  if (typeof document == 'undefined') {
    return (
      <>
        <CustomHead
          siteName="PRIME"
          pageName="all stories"
          url="https://prime.dailybruin.com/all"
          description="PRIME is the official website for the Daily Bruin's quarterly arts, culture, and lifestyle magazine."
          image="https://assets.dailybruin.com/images/prime.map.articles.to.issues/PRIME.thumbnail-cf84048a01d52fbc0582220cf04779ad.jpg"
        />
      </>
    )
  }
  const formatTerm = term => {
    return (
      term.charAt(0).toUpperCase() + term.slice(1, -2) + ' ' + term.slice(-2)
    )
  }
  console.log(data)
  const featuredSlugs = data.issues.issues.map(issue => {
    return { slug: issue.articles[0], quarter: formatTerm(issue.term) }
  })
  const featuredArticles1 = featuredSlugs.map(element => {
    return {
      ...element,
      ...data.allPrimeArticle.edges.find(
        edge => edge.node.slug === element.slug
      ).node,
    }
  })
  console.log(featuredArticles1)
  const featuredArticles2 = featuredArticles1.map(ele => {
    return {
      title: ele.headline,
      authors: [ele.author],
      description: ele.excerpt,
      quarter: ele.quarter,
      imageURL: ele.coverimg,
      slug: ele.slug,
    }
  })
  console.log(featuredArticles2)
  return (
    <>
      <CustomHead
        siteName="PRIME"
        url="https://prime.dailybruin.com"
        description="PRIME is the official website for the Daily Bruin's quarterly arts, culture, and lifestyle magazine."
        image="https://assets.dailybruin.com/images/prime.map.articles.to.issues/PRIME.thumbnail-cf84048a01d52fbc0582220cf04779ad.jpg"
      />
      <CustomHeader transparent={true} />
      <TitleGallery stories={featuredArticles2} />
      <div
        className={css`
          height: 20px;
        `}
      />
      {data.issues.issues.map((issue, idx) => {
        console.log(issue)
        const issueData = issue.articles.map(slug => {
          const curArticle = data.allPrimeArticle.edges.find(
            edge => edge.node.slug === slug
          ).node
          console.log(curArticle)
          return {
            title: curArticle.headline,
            caption: curArticle.excerpt,
            imageSrc: curArticle.coverimg,
            href: `/${curArticle.slug.split('.').join('')}`,
            slug: curArticle.slug,
            aType: curArticle.articleType,
          }
        })
        if (idx === 0)
          return <ThreeArticleCardRow cards={issueData} term={issue.term} />
        return (
          <TwoArticleCardRow
            cards={issueData}
            term={issue.term}
            title={issue.title}
          />
        )
      })}
      <Footer />
    </>
  )
}

export default IndexPage
