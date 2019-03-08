import React from 'react'
import { css, cx } from 'emotion'
import Swiper from 'react-id-swiper'
import { Link } from 'gatsby'
import './styles.css'
import { ArticleCard } from './ArticleCard'
interface QuarterlyStoriesProps {
  quarters: {
    quarter: String
    stories: any[]
  }[]
}

export class QuarterlyStories extends React.Component<QuarterlyStoriesProps> {
  render() {
    const params = {
      slidesPerView: 3,
      spaceBetween: 10,
      navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
      },
      renderPrevButton: () => <div className="button-prev" />,
      renderNextButton: () => <div className="button-next" />,
    }
    return (
      <div>
        {this.props.quarters.map((quarter, i) => (
          <div
            className={css`
              position: relative;
            `}
          >
            <p
              className={css`
                font-family: Barlow;
                font-style: italic;
                font-weight: 500;
                line-height: normal;
                font-size: 48px;
                margin-left: 5%;
                margin-bottom: 15px;
              `}
            >
              <b>{quarter.quarter}</b>
            </p>
            <div
              className={css`
                @media screen and (max-width: 800px) {
                  display: none;
                }
              `}
            >
              <Swiper {...params}>
                {quarter.stories.map(story => (
                  <div
                    className={css`
                      height: auto;
                      width: 10vw;
                      margin-left: 5px;
                      margin-right: 5px;
                    `}
                  >
                    <ArticleCard
                      blackCardFontSize={1}
                      whiteCardFontSize={0.8}
                      blackCardText={story.headline}
                      whiteCardText={story.excerpt}
                      imageSrc={story.coverimg}
                      aType={story.articleType}
                      slug={story.slug}
                      imageHeightVW={18}
                      imageHeightMobileVW={20}
                    />
                  </div>
                ))}
              </Swiper>
            </div>
            <div
              className={css`
                @media screen and (min-width: 800px) {
                  display: none;
                }
              `}
            >
              <Swiper {...params} slidesPerView={1}>
                {quarter.stories.map(story => (
                  <div
                    className={css`
                      height: auto;
                      width: calc(10vw);
                    `}
                  >
                    <ArticleCard
                      blackCardFontSize={1}
                      whiteCardFontSize={0.8}
                      blackCardText={story.headline}
                      whiteCardText={story.excerpt}
                      imageSrc={story.coverimg}
                      aType={story.articleType}
                      slug={story.slug}
                      imageHeightVW={18}
                      imageHeightMobileVW={60}
                    />
                  </div>
                ))}
              </Swiper>
            </div>
            {i < this.props.quarters.length - 1 && (
              <div
                className={css`
                  height: 5px;
                  width: 98%;
                  background-color: black;
                  margin-top: 50px;
                  margin-bottom: 50px;
                  margin-left: 1%;
                `}
              />
            )}
          </div>
        ))}
      </div>
    )
  }
}
