import * as React from 'react'
import { graphql } from 'gatsby'
import { Article } from '@dailybruin/lux'


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
          max-width: 700px;
          margin: 15px;
        `}
      >
        <CustomHeader transparent={false} />
        <StyledCoverPhoto
          title="The Road to Royce"
          authors={['John Tudhope']}
          description="A description of the story goes here. It should be about two sentence and probably this long and maybe even longer like this."
          quarter="Fall 2018"
          imageURL="https://ichef.bbci.co.uk/news/660/cpsprodpb/6EB0/production/_103963382_adder2.jpg"
          photographers={['Max Wu', 'Yeet']}
        />
        <Article dropcap={true} content={data.kerckhoffArticle.content} />
      </div>
      <FooterAuthorBio
        name="Kristie-Valerie Hoang"
        email="khoang@dailybruin.com"
        handle="@KristieHoang DB"
        bio="Hoang is a third-year political science major. She is the Social Media director at the Daily Bruin."
      />
    </div>
  )
};
