import * as React from 'react'
import { graphql } from 'gatsby'
import { Article, Video } from '@dailybruin/lux'
import { css } from 'react-emotion'

import GraphicNovel from '../components/GraphicNovel'
import CustomHead from '../components/CustomHead'
import CustomHeader from '../components/CustomHeader'
import { HeaderHighLight } from '../components/TripleHeader/HeaderHighLight'
import { StyledCoverPhoto } from '../components/StyledCoverPhoto'
import { FooterAuthorBio } from '../components/FooterAuthorBio'
import { CustomPullImage } from '../components/pullImage'
import { CustomPullQuote } from '../components/pullQuote'

export const query = graphql`
  query($slug: String!) {
    primeArticle(slug: { eq: $slug }) {
      headline
      author
      authorbio
      authoremail
      authortwitter
      coverimg
      covercred
      coveralt
      articleType
      updated
      content {
        type
        value
      }
    }
  }
`
const Italics = props => <p>{props.content}</p>

const Subheading = props => (
  <HeaderHighLight
    title={props.name}
    highlightPosition="bottom"
    textAlign="left"
    fullWidth={false}
  />
)

// This is server side rendering (SSR) and is used when gatsby builds. This will not be seen once the browser loads the page
//the same article page is used for all articles
export default ({ data, pageContext }) => {
  if (typeof document === 'undefined') {
    if (!data.primeArticle) {
      return <></>
    }
    return (
      <>
        <CustomHead
          siteName="PRIME"
          pageName={data.primeArticle.headline}
          description={data.primeArticle.excerpt}
          url={
            !data.primeArticle.slug
              ? ''
              : `https://prime.dailybruin.com/${data.primeArticle.slug
                  .split('.')
                  .join('')}`
          }
          image={data.primeArticle.coverimg}
        >
          {/* Added because this person wants her article de-indexed. It should add a tag only for this article. */}
          {(data.primeArticle.headline === "The Fundamental Difference") && (data.primeArticle.author === "Genevieve Finn") && <meta name="robots" content="noindex, nofollow" />}
        </CustomHead>
      </>
    )
  }

  const term = pageContext.term
  const season = term.substring(0, term.length - 2)
  const year = '20' + term.substring(term.length - 2, term.length)
  const formatTerm = season + ' ' + year

  // Client Side Rendering = when the browser renders the page, this version will be seen.
  return (
    <div>
      <CustomHead
        siteName="PRIME"
        pageName={data.primeArticle.headline}
        description={data.primeArticle.excerpt}
        url={
          !data.primeArticle.slug
            ? ''
            : `https://prime.dailybruin.com/${data.primeArticle.slug
                .split('.')
                .join('')}`
        }
        image={data.primeArticle.coverimg}
        >
        {/* Added because this person wants her article de-indexed. It should add a tag only for this article. */}
        {(data.primeArticle.headline === "The Fundamental Difference") && (data.primeArticle.author === "Genevieve Finn") && <meta name="robots" content="noindex, nofollow" />}
      </CustomHead>

      <CustomHeader transparent={false} />
      {console.log(data)}
      <StyledCoverPhoto
        socialMediaLinks={[]}
        title={data.primeArticle.headline}
        authors={[data.primeArticle.author]}
        quarter={formatTerm}
        imageURL={data.primeArticle.coverimg}
        photographers={[data.primeArticle.covercred]}
      />
      {data.primeArticle.articleType === 'graphic' && (
        <GraphicNovel content={data.primeArticle.content} />
      )}
      {data.primeArticle.articleType === 'article' && (
        <>
        <p style={{"text-align":"center", "font-family": 'Source Serif Pro'}}> {data.primeArticle.updated}</p>
        <Article
          dropcap={true}
          content={data.primeArticle.content}
          customTypeComponentMapping={{
            pull: CustomPullQuote,
            pullimage: CustomPullImage,
            subheading: Subheading,
            italics: Italics,
            video: Video,
          }}
          style={css`
            max-width: 60%;
            font-family: 'Source Serif Pro';
            line-height: 38px;
            font-size: 1.25rem;
            min-width: 300px;
            figcaption {
              font-style: italic;
              font-size: 1.15rem;
            }
            @media only screen and (max-width: 800px) {
              max-width: 80%;
            }
          `}
        />
        </>
      )}
      <FooterAuthorBio
        name={data.primeArticle.author}
        email={data.primeArticle.authoremail}
        handle={data.primeArticle.authortwitter}
        bio={data.primeArticle.authorbio}
      />
    </div>
  )
}
