import * as React from 'react'
import { graphql } from 'gatsby'
import { Article } from '@dailybruin/lux'
import { css } from 'react-emotion'

import GraphicNovel from '../components/GraphicNovel'
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

export default ({ data, pageContext }) => {
  if (typeof document == 'undefined') {
    return null
  }
  const term = pageContext.term
  const season = term.substring(0, term.length - 2)
  const year = '20' + term.substring(term.length - 2, term.length)
  const formatTerm = season + ' ' + year
  return (
    <div>
      {console.log(pageContext)}
      <CustomHeader transparent={false} />
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
        <Article
          dropcap={true}
          content={data.primeArticle.content}
          customTypeComponentMapping={{
            pull: CustomPullQuote,
            pullimage: CustomPullImage,
            subheading: Subheading,
            italics: Italics,
          }}
          style={css`
            max-width: 60%;
            font-family: 'Source Serif Pro';
            line-height: 38px;
            font-size: 1.25rem;
            min-width: 300px;
          `}
        />
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
