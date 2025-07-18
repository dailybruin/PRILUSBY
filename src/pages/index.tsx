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
          description="PRIME is the official website for the Daily Bruin's quarterly arts, culture and lifestyle magazine."
          image="https://assets.dailybruin.com/images/sabrina.whensoundshurt/cover-83530e07fd73cf3d7e1c8b5a85639df2.jpg"
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
          description="PRIME is the official website for the Daily Bruin's quarterly arts, culture and lifestyle magazine."
          image="https://assets.dailybruin.com/images/sabrina.whensoundshurt/cover-83530e07fd73cf3d7e1c8b5a85639df2.jpg"
        />
      </>
    )
  }
  const formatTerm = term => {
    return (
      term.charAt(0).toUpperCase() + term.slice(1, -2) + ' ' + term.slice(-2)
    )
  }
  const featuredSlugs = data.issues.issues.map(issue => {
    return { slug: issue.articles[0], quarter: formatTerm(issue.term) }
  })
  console.log(featuredSlugs)

  const featuredArticles1 = featuredSlugs.map(element => {
    console.log("element: \n", element);
    for (const edge of data.allPrimeArticle.edges) {
      if (edge.node.slug === element.slug) {
        // console.log("found node: \n", edge.node)
        return {
          ...element,
          ...edge.node,
        }
      }
    }
      console.warn(`No matching node found for slug: ${element.slug}`);
  });

  const featuredArticles2 = featuredArticles1.map(ele => {
    console.log("ele: ", ele)
    if (ele === undefined) {
      return {
        title: "DEFAUT_HEADLINE",
        authors: "DEFAULT_AUTHOR",
        description: "DEFAULT_EXCERPT",
        quarter: "DEFAULT_QUARTER",
        imageURL: "https://assets3.dailybruin.com/images/prime.nightlifestudents/7.25.prime.nightlifeworkers_illo2-75b055703bef18adf6d8fa51e7857617.png",
        slug: "DEFAULT.SLUG",
      }
    }
    return {
      title: ele.headline,
      authors: [ele.author],
      description: ele.excerpt,
      quarter: ele.quarter,
      imageURL: ele.coverimg,
      slug: ele.slug,
    }
  })
  return (
    <>
      <CustomHead
        siteName="PRIME"
        url="https://prime.dailybruin.com"
        description="PRIME is the official website for the Daily Bruin's quarterly arts, culture and lifestyle magazine."
        image="https://assets.dailybruin.com/images/sabrina.whensoundshurt/cover-83530e07fd73cf3d7e1c8b5a85639df2.jpg"
      />
      <CustomHeader transparent={true} />
      <TitleGallery stories={featuredArticles2} />
      <div
        className={css`
          height: 20px;
        `}
      />
      {console.log(data)}
      {data.issues.issues.map((issue, idx) => {
        const issueData = issue.articles.map(slug => {
          let curArticle = data.allPrimeArticle.edges.find(edge => {
            return edge.node.slug === slug
          })
          if (curArticle === undefined) {
            console.log("ERROR: couldn't find a mapping of an article.")
            console.log(slug)
            return {}
          }
          curArticle = curArticle.node
          // console.log(curArticle.articleType)
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
          return (
            <ThreeArticleCardRow
              key={idx}
              cards={issueData}
              term={issue.term}
            />
          )
        return (
          <TwoArticleCardRow
            key={idx}
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
