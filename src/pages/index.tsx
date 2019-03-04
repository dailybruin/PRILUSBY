import * as React from 'react'
import { graphql } from 'gatsby'
import {
  Article,
  CoverPhoto,
  Footer,
  Head,
  XPosition,
  YPosition,
} from '@dailybruin/lux'
import GraphicNovel from '../components/GraphicNovel'
import CustomHeader from '../components/CustomHeader'
import { ArticleCard } from '../components/ArticleCard'
import { css } from 'emotion'

import { TitleGallery } from '../components/TitleGallery'
import { StyledCoverPhoto } from '../components/StyledCoverPhoto'
import { FooterAuthorBio } from '../components/FooterAuthorBio'
import { QuarterlyStories } from '../components/QuarterlyStories'

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteName
        description
        url
        image
      }
    }
    kerckhoffArticle {
      headline
      author
      content {
        type
        value
      }
    }
  }
`

const quarterlyStories = 
[
  {
    quarter: "Fall 2018",
    stories: 
    [
      {
        title: "The Road to Royce",
        authors: ["John Tudhope"],
        description: "A description of the story goes here. It should be about two sentence and probably this long and maybe even longer like this.",
        quarter: "Fall 2018",
        imageURL: "https://ichef.bbci.co.uk/news/660/cpsprodpb/6EB0/production/_103963382_adder2.jpg",
      },
      {
        title: "Song Sot/Survival",
        authors: ["Kristie-Valerie Hoang"],
        description: "A description of the story goes here. It should be about two sentence and probably this long and maybe even longer like this.",
        quarter: "Winter 2018",
        imageURL: "https://s3.amazonaws.com/images.seroundtable.com/google-submit-url-1516800645.jpg",
      },
      {
        title: "The Road to Royce",
        authors: ["John Tudhope"],
        description: "A description of the story goes here. It should be about two sentence and probably this long and maybe even longer like this.",
        quarter: "Fall 2018",
        imageURL: "https://ichef.bbci.co.uk/news/660/cpsprodpb/6EB0/production/_103963382_adder2.jpg",
      },
      {
        title: "Song Sot/Survival",
        authors: ["Kristie-Valerie Hoang"],
        description: "A description of the story goes here. It should be about two sentence and probably this long and maybe even longer like this.",
        quarter: "Winter 2018",
        imageURL: "https://s3.amazonaws.com/images.seroundtable.com/google-submit-url-1516800645.jpg",
      }
    ]
  },
  {
    quarter: "Winter 2019",
    stories: 
    [
      {
        title: "YETEETET",
        authors: ["John Tudhope"],
        description: "A description of the story goes here. A description of the story goes here. A description of the story goes here. A description of the story goes here. It should be about two sentence and probably this long and maybe even longer like this.",
        quarter: "Fall 2018",
        imageURL: "https://ichef.bbci.co.uk/news/660/cpsprodpb/6EB0/production/_103963382_adder2.jpg",
      },
      {
        title: "Song Sot/Survival",
        authors: ["Kristie-Valerie Hoang"],
        description: "A description of the story goes here. It should be about two sentence and probably this long and maybe even longer like this.",
        quarter: "Winter 2018",
        imageURL: "https://s3.amazonaws.com/images.seroundtable.com/google-submit-url-1516800645.jpg",
      }
    ]
  }
]
const stories = [
  {
    title: "The Road to Royce",
    authors: ["John Tudhope"],
    description: "A description of the story goes here. It should be about two sentence and probably this long and maybe even longer like this.",
    quarter: "Fall 2018",
    imageURL: "https://ichef.bbci.co.uk/news/660/cpsprodpb/6EB0/production/_103963382_adder2.jpg",
  },
  {
    title: "Song Sot/Survival",
    authors: ["Kristie-Valerie Hoang"],
    description: "A description of the story goes here. It should be about two sentence and probably this long and maybe even longer like this.",
    quarter: "Winter 2018",
    imageURL: "https://s3.amazonaws.com/images.seroundtable.com/google-submit-url-1516800645.jpg",
  }
]

const IndexPage = ({ data }) => (
  <>
    <StyledCoverPhoto
      title="The Road to Royce"
      authors={["John Tudhope"]}
      description="A description of the story goes here. It should be about two sentence and probably this long and maybe even longer like this."
      quarter="Fall 2018"
      imageURL="https://ichef.bbci.co.uk/news/660/cpsprodpb/6EB0/production/_103963382_adder2.jpg"
      photographers={["Max Wu", "Yeet"]}
    >
    </StyledCoverPhoto>
    <TitleGallery
      stories={stories}
    ></TitleGallery>
    <QuarterlyStories
      quarters={quarterlyStories}>
    </QuarterlyStories>
    <FooterAuthorBio
      name="Kristie-Valerie Hoang"
      email="khoang@dailybruin.com"
      handle="@KristieHoang DB"
      bio="Hoang is a third-year political science major. She is the Social Media director at the Daily Bruin."
    >
    </FooterAuthorBio>
    <Head {...data.site.siteMetadata} />
    <CustomHeader transparent={true} />
    <CoverPhoto
      headline={data.kerckhoffArticle.headline}
      authors={data.kerckhoffArticle.author}
      imageURL="https://chancellor.ucla.edu/wp-content/uploads/2018/07/ChancellorBlock_1366x912_acf_cropped.jpg"
      xPosition={XPosition.Center}
      yPosition={YPosition.Center}
    />
    <GraphicNovel />
    <Article dropcap={true} content={data.kerckhoffArticle.content} />
    <div
      className={css`
        display: flex;
        justify-content: space-around;
      `}
    >
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
        wrapperWidthVW={33}
        imgWidthVW={30}
      />
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
        wrapperWidthVW={33}
        imgWidthVW={30}
      />
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
        wrapperWidthVW={33}
        imgWidthVW={30}
      />
    </div>
    <div
      className={css`
        display: flex;
        justify-content: space-around;
      `}
    >
      <ArticleCard
        blackCardFontSize={1.2}
        whiteCardFontSize={1}
        blackCardText="Song Sot/Survival"
        whiteCardText={
          'A description of the story goes here. It should be about \
        two sentences and probably about this long and maybe even longer like this.'
        }
        imageSrc="https://ampbyexample.com/img/canoe_900x600.jpg"
        href="/"
        wrapperWidthVW={41}
        imgWidthVW={40}
      />
      <ArticleCard
        blackCardFontSize={1.2}
        whiteCardFontSize={1}
        blackCardText="This is supposed to be a super long title and I have no idea what it should eventually land but I and growing paranoid and this is looking pretty bad, DUH!"
        whiteCardText={
          'A description of the story goes here. It should be about \
        two sentences and probably about this long and maybe even longer like this.'
        }
        imageSrc="https://ampbyexample.com/img/canoe_900x600.jpg"
        href="/"
        wrapperWidthVW={41}
        imgWidthVW={40}
      />
    </div>
    <Footer developers="Nathan Smith" copyrightYear={2018} />
  </>
)

export default IndexPage
