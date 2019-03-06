import * as React from 'react'
import Swiper from 'react-id-swiper'
import { css } from 'emotion'
import { ArticleCard } from './ArticleCard'
import { HeaderHighLight } from './headerHeadLight'

import './styles.css'

interface TAC {
  title: string
  caption: string
  imageSrc: string
  href: string
}

interface TwoArticleCardRowProps {
  cards: TAC[]
}

export class TwoArticleCardRow extends React.Component<TwoArticleCardRowProps> {
  render() {
    const cards = this.props.cards.slice(0, 2)
    const swiperParams = {
      navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
      },
      renderPrevButton: () => <div className="button-prev" />,
      renderNextButton: () => <div className="button-next" />,
    }
    return (
      <div>
        <HeaderHighLight
          title="FALL 2018 // facing tomorrow"
          highlightPosition="top"
          textAlign="left"
          fullWidth={true}
        />
        <div
          className={css`
            display: flex;
            justify-content: space-around;
            margin-top: 45px;
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
              imageHeightVW={30}
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
          </Swiper>
        </div>
      </div>
    )
  }
}