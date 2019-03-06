import * as React from 'react'
import { graphql } from 'gatsby'
import { ArticleCard } from '../components/ArticleCard'
import { css } from 'emotion'
import CustomHeader from '../components/CustomHeader'
import { TripleHeader } from '../components/TripleHeader/TripleHeader'
import { Footer } from '../components/Footer'
import { ArticleGrid } from '../components/ArticleGrid'
import { Magazine } from '../components/Magazine'
import { TripleHeaderAlternative } from '../components/TripleHeader/TripleHeaderAlternative'

export const query = graphql`
  query($term: String!) {
    issue(term: { eq: $term }) {
      term
      title
      coverphoto
      articles
    }
  }
`

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
    imageHeightVW={20}
    imageHeightMobileVW={50}
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
    imageHeightVW={20}
    imageHeightMobileVW={50}
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
    imageHeightVW={20}
    imageHeightMobileVW={50}
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
    imageHeightVW={20}
    imageHeightMobileVW={50}
  />,
]

export default ({ data }) => {
  const term = data.issue.term
  const season = term.substring(0, term.length - 2)
  const year = '20' + term.substring(term.length - 2, term.length)
  let issuuLink = `https://e.issuu.com/anonymous-embed.html?u=dailybruin&d=prime${season}${year}`
  if (parseInt(year) > 2017 || (parseInt(year) === 2017 && season === 'fall'))
    issuuLink = `https://e.issuu.com/anonymous-embed.html?u=dailybruin&d=prime_${season}_${year}`
  return (
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
            title={'Richard!!!'}
            description={'RICHARD RICHARD RICHARD!!!!!!!!!'}
            imageURL={
              'https://s3.amazonaws.com/images.seroundtable.com/google-submit-url-1516800645.jpg'
            }
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
            issue={term}
            title={'Richard!!!'}
            description={'RICHARD RICHARD RICHARD!!!!!!!!!'}
            imageURL={
              'https://s3.amazonaws.com/images.seroundtable.com/google-submit-url-1516800645.jpg'
            }
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
  )
}
