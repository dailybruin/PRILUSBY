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

interface ThreeArticleCardRowProps {
  term: string
  cards: TAC[]
}

export class ThreeArticleCardRow extends React.Component<
  ThreeArticleCardRowProps
> {
  render() {
    const cards = this.props.cards.slice(0, 3)
    const swiperParams = {
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
          margin: 10px;
        `}
      >
        <HeaderHighLight
          title="current issue"
          highlightPosition="bottom"
          textAlign="left"
          fullWidth={false}
        />
        <div
          className={css`
            display: flex;
            justify-content: space-around;
            margin-top: 0px;
            @media screen and (max-width: 700px) {
              display: none;
            }
          `}
        >
          {cards.map((card, i) => (
            <ArticleCard
              key={i}
              blackCardFontSize={1}
              whiteCardFontSize={0.8}
              blackCardText={card.title}
              whiteCardText={card.caption}
              imageSrc={card.imageSrc}
              href={card.href}
              imageHeightVW={20}
            />
          ))}
        </div>
        <div
          className={css`
            @media screen and (min-width: 700px) {
              display: none;
            }
          `}
        >
          <Swiper {...swiperParams}>
            <div>
              <ArticleCard
                key={0}
                blackCardFontSize={1}
                whiteCardFontSize={0.8}
                blackCardText={cards[0].title}
                whiteCardText={cards[0].caption}
                imageSrc={cards[0].imageSrc}
                href={cards[0].href}
                imageHeightVW={50}
              />
            </div>
            <div>
              <ArticleCard
                key={1}
                blackCardFontSize={1}
                whiteCardFontSize={0.8}
                blackCardText={cards[1].title}
                whiteCardText={cards[1].caption}
                imageSrc={cards[1].imageSrc}
                href={cards[1].href}
                imageHeightVW={50}
              />
            </div>
            <div>
              <ArticleCard
                key={2}
                blackCardFontSize={1}
                whiteCardFontSize={0.8}
                blackCardText={cards[2].title}
                whiteCardText={cards[2].caption}
                imageSrc={cards[2].imageSrc}
                href={cards[2].href}
                imageHeightVW={50}
              />
            </div>
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
