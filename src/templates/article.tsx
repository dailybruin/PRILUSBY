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
  return (
    <div>
      {console.log(pageContext)}
      <CustomHeader transparent={false} />
      <StyledCoverPhoto
        socialMediaLinks={['mailto:online@media.ucla.edu']}
        title={data.primeArticle.headline}
        authors={[data.primeArticle.author]}
        quarter={pageContext.term}
        imageURL={data.primeArticle.coverimg}
        photographers={[data.primeArticle.covercred]}
      />
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
          font-size: 24px;
        `}
      />
      <FooterAuthorBio
        name={data.primeArticle.author}
        email={data.primeArticle.authoremail}
        handle={data.primeArticle.authortwitter}
        bio={data.primeArticle.authorbio}
      />
    </div>
  )
}
