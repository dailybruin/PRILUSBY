import * as React from 'react'
import { graphql } from 'gatsby'
import { ArticleCard } from '../components/ArticleCard'
import { css } from 'emotion'
import CustomHead from '../components/CustomHead'
import CustomHeader from '../components/CustomHeader'
import { TripleHeader } from '../components/TripleHeader/TripleHeader'
import { Footer } from '../components/Footer'
import { ArticleGrid } from '../components/ArticleGrid'
import { Magazine } from '../components/Magazine'
import { TripleHeaderAlternative } from '../components/TripleHeader/TripleHeaderAlternative'

// export const query = graphql`
//   query($name: String!) {
//     issue(title: { eq: $name }) {
//   }
// `
export const query = graphql`
  query {
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

export default ({ data, pageContext }) => {
  let articles = []
  data.allPrimeArticle.edges.forEach(edge => {
    let slug = edge.node.slug
    if (pageContext.articles.indexOf(slug) > -1) {
      articles.push(edge.node)
    }
  })
  articles.sort((a, b) => {
    return (
      pageContext.articles.indexOf(a.slug) -
      pageContext.articles.indexOf(b.slug)
    )
  })
  const term = pageContext.term
  const season = term.substring(0, term.length - 2)
  const year = '20' + term.substring(term.length - 2, term.length)
  let issuuLink = `https://e.issuu.com/anonymous-embed.html?u=dailybruin&d=prime${season}${year}`
  if (parseInt(year) > 2017 || (parseInt(year) === 2017 && season === 'fall'))
    issuuLink = `https://e.issuu.com/anonymous-embed.html?u=dailybruin&d=prime_${season}_${year}`
  if (term === 'spring18')
    issuuLink =
      'https://e.issuu.com/anonymous-embed.html?u=dailybruin&d=finalpdf'
  if (term == 'winter20')
    issuuLink = 'https://e.issuu.com/anonymous-embed.html?u=dailybruin&d=master'
  // the link is determined by the filename on upload oops so be careful!
  const formatTerm = season + ' ' + year
  const articleCards = []
  articles.forEach((article, i) => {
    if (i === 0) return
    articleCards.push(
      <ArticleCard
        blackCardFontSize={1}
        whiteCardFontSize={0.8}
        blackCardText={article.headline}
        whiteCardText={article.excerpt}
        imageSrc={article.coverimg}
        aType={article.articleType}
        slug={article.slug}
        link={article.link}
        imageHeightVW={20}
        imageHeightMobileVW={50}
      />
    )
  })
  return (
    <>
      <CustomHead
        siteName="PRIME"
        pageName={formatTerm}
        url={`https://prime.dailybruin.com/${term}`}
        description="PRIME is the official website for the Daily Bruin's quarterly arts, culture, and lifestyle magazine."
        image="http://assets.dailybruin.com/images/prime.map.articles.to.issues/prime%20cover%20spring.jpg"
      />
      <div
        className={css`
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          className={css`
            width: 100%;
            margin: 0 15px;
          `}
        >
          <CustomHeader transparent={false} />
          <div
            className={css`
              @media screen and (max-width: 940px) {
                display: none;
              }
            `}
          >
            <TripleHeader
              title={pageContext.title}
              term={formatTerm}
              description={articles[0].excerpt}
              imageURL={articles[0].coverimg}
              slug={articles[0].slug}
            />
          </div>
          <div
            className={css`
              @media screen and (min-width: 940px) {
                display: none;
              }
            `}
          >
            <TripleHeaderAlternative
              issue={formatTerm}
              description={articles[0].excerpt}
              imageURL={articles[0].coverimg}
              title={pageContext.title}
              slug={articles[0].slug}
            />
          </div>
          <div
            className={css`
              width: 95%;
              margin: 1rem auto;
            `}
          >
            <ArticleGrid>{articleCards}</ArticleGrid>
          </div>
          <Magazine link={issuuLink} />
          <Footer />
        </div>
      </div>
    </>
  )
}
