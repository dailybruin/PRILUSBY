import * as React from 'react'
import { graphql } from 'gatsby'
import { ArticleCard } from '../components/ArticleCard';
import { css } from 'emotion';
import CustomHeader from '../components/CustomHeader';
import { TripleHeader } from '../components/TripleHeader/TripleHeader';
import { Footer } from '../components/Footer';
import { ArticleGrid } from '../components/ArticleGrid'
import { Magazine } from '../components/Magazine';
import { TripleHeaderAlternative } from '../components/TripleHeader/TripleHeaderAlternative';

export const query = graphql`
  query($name: String!) {
    kerckhoffArticle(title: { eq: $name }) {
      headline
      author
      content {
        type
        value
      }
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
        <div className={css`
          @media screen and (max-width: 940px) {
            display: none;
          }
        `}>
          <TripleHeader
            title={"Richard!!!"}
            description={"RICHARD RICHARD RICHARD!!!!!!!!!"}
            imageURL={"https://s3.amazonaws.com/images.seroundtable.com/google-submit-url-1516800645.jpg"}
          />
        </div>
        <div className={css`
          @media screen and (min-width: 940px) {
            display: none;
          }
        `}>
          <TripleHeaderAlternative
            issue={"winter 2019"}
            title={"Richard!!!"}
            description={"RICHARD RICHARD RICHARD!!!!!!!!!"}
            imageURL={"https://s3.amazonaws.com/images.seroundtable.com/google-submit-url-1516800645.jpg"}
          />
        </div>
        <div className={css`
          width: 95%;
          margin: 1rem auto;
        `}><ArticleGrid>{articleCards}</ArticleGrid></div>
        <Magazine link={"https://e.issuu.com/anonymous-embed.html?u=dailybruin&d=primefall2015"} />
      </div>
      <Footer />
    </div>
  )
};
