import * as React from 'react'
import Swiper from 'react-id-swiper'
import { css } from 'emotion'
import { ArticleCard } from './ArticleCard'
import { HeaderHighLight } from './TripleHeader/HeaderHighLight'
import { Link } from 'gatsby'
import './styles.css'

interface TAC {
  title: string
  caption: string
  imageSrc: string
  href: string
}

interface TwoArticleCardRowProps {
  cards: TAC[]
  term: string
  title: string
}

export class TwoArticleCardRow extends React.Component<TwoArticleCardRowProps> {
  render() {
    const cards = this.props.cards.slice(0, 2)
    const allcards = this.props.cards
    const swiperParams = {
      spaceBetween: 10,
      navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
      },
      renderPrevButton: () => <div className="button-prev" />,
      renderNextButton: () => <div className="button-next" />,
    }
    return (
      <div
        className={css`
          width: 100%;
        `}
      >
        <HeaderHighLight
          title={`${this.props.term} // ${this.props.title}`}
          highlightPosition="top"
          textAlign="left"
          fullWidth={true}
        />
        <div
          className={css`
            display: flex;
            justify-content: space-around;
            width: 100%;
            margin-top: 20px;
            @media screen and (max-width: 700px) {
              display: none;
            }
          `}
        >
          {cards.map((card, i) => (
            <div
              className={css`
                height: auto;
                width: 100%;
                margin-left: 5px;
                margin-right: 5px;
              `}
            >
              <ArticleCard
                key={i}
                blackCardFontSize={1}
                whiteCardFontSize={0.8}
                blackCardText={card.title}
                whiteCardText={card.caption}
                imageSrc={card.imageSrc}
                href={card.href}
                imageHeightVW={25}
                imageHeightMobileVW={50}
              />
            </div>
          ))}
        </div>
        <div
          className={css`
            margin-top: 50px;
            width: 100%;
            @media screen and (min-width: 700px) {
              display: none;
            }
          `}
        >
          <Swiper {...swiperParams}>
            {allcards.map((card, i) => (
              <div
                className={css`
                  height: auto;
                  width: 100%;
                  margin-left: 5px;
                  margin-right: 5px;
                `}
              >
                <ArticleCard
                  key={i}
                  blackCardFontSize={1}
                  whiteCardFontSize={0.8}
                  blackCardText={card.title}
                  whiteCardText={card.caption}
                  imageSrc={card.imageSrc}
                  href={card.href}
                  imageHeightVW={25}
                  imageHeightMobileVW={50}
                />
              </div>
            ))}
          </Swiper>
        </div>
        <div
          className={css`
            font-family: Barlow;
            font-style: italic;
            font-size: 18px;
            font-weight: 600;

            width: 100%;
            text-align: right;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            /* width: 100%; */
          `}
        >
          <div
            className={css`
              padding-bottom: 0px;
              padding-left: 0px;
              margin-top: 20px;
              margin-bottom: 25px;
              margin-right: 25px;
              border-bottom: 2px solid #fff96b;
              width: 110px;
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
              a {
                text-decoration: none;
                color: inherit;
              }
            `}
          >
            <Link to={`/${this.props.term}`}>more stories</Link>
          </div>
        </div>
      </div>
    )
  }
}
