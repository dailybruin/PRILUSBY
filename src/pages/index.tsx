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
<<<<<<< HEAD
import GraphicNovel from '../components/GraphicNovel'
=======
import { ArticleCard } from "../components/ArticleCard";
import { css } from 'emotion';
>>>>>>> master

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
const IndexPage = ({ data }) => (
  <>
    <Head {...data.site.siteMetadata} />
    <CoverPhoto
      headline={data.kerckhoffArticle.headline}
      authors={data.kerckhoffArticle.author}
      imageURL="https://chancellor.ucla.edu/wp-content/uploads/2018/07/ChancellorBlock_1366x912_acf_cropped.jpg"
      xPosition={XPosition.Center}
      yPosition={YPosition.Center}
    />
    <GraphicNovel />
    <Article dropcap={true} content={data.kerckhoffArticle.content} />
    <div className={css`
      display: flex;
      justify-content: space-around;
    `}>
      <ArticleCard
        blackCardFontSize={1}
        whiteCardFontSize={0.8}
        blackCardText="Song Sot/Survival"
        whiteCardText={"A description of the story goes here. It should be about \
        two sentences and probably about this long and maybe even longer like this."}
        imageSrc="https://ampbyexample.com/img/canoe_900x600.jpg"
        href="/"
        wrapperWidthVW={33}
        imgWidthVW={30}
      />
      <ArticleCard
        blackCardFontSize={1}
        whiteCardFontSize={0.8}
        blackCardText="Song Sot/Survival"
        whiteCardText={"A description of the story goes here. It should be about \
        two sentences and probably about this long and maybe even longer like this."}
        imageSrc="https://ampbyexample.com/img/canoe_900x600.jpg"
        href="/"
        wrapperWidthVW={33}
        imgWidthVW={30}
      />
      <ArticleCard
        blackCardFontSize={1}
        whiteCardFontSize={0.8}
        blackCardText="Song Sot/Survival"
        whiteCardText={"A description of the story goes here. It should be about \
        two sentences and probably about this long and maybe even longer like this."}
        imageSrc="https://ampbyexample.com/img/canoe_900x600.jpg"
        href="/"
        wrapperWidthVW={33}
        imgWidthVW={30}
      />
    </div>
    <div className={css`
      display: flex;
      justify-content: space-around;
    `}>
      <ArticleCard
        blackCardFontSize={1.2}
        whiteCardFontSize={1}
        blackCardText="Song Sot/Survival"
        whiteCardText={"A description of the story goes here. It should be about \
        two sentences and probably about this long and maybe even longer like this."}
        imageSrc="https://ampbyexample.com/img/canoe_900x600.jpg"
        href="/"
        wrapperWidthVW={41}
        imgWidthVW={40}
      />
      <ArticleCard
        blackCardFontSize={1.2}
        whiteCardFontSize={1}
        blackCardText="This is supposed to be a super long title and I have no idea what it should eventually land but I and growing paranoid and this is looking pretty bad, DUH!"
        whiteCardText={"A description of the story goes here. It should be about \
        two sentences and probably about this long and maybe even longer like this."}
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
