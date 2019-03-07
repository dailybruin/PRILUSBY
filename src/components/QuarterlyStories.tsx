import React from 'react'
import { css, cx } from 'emotion'
import Swiper from 'react-id-swiper'
import { Link } from 'gatsby'
import './styles.css'

interface QuarterlyStoriesProps {
  quarters: {
    quarter: String
    stories: {
      title: string
      description: string
      imageURL: string
      link: string
    }[]
  }[]
}

const CustomLink = props => {
  if (!props.link) return <div>{props.children}</div>
  if (props.link[0] !== '/')
    return (
      <a
        href={props.link}
        className={css`
          color: black;
          text-decoration: none;
        `}
      >
        {props.children}
      </a>
    )
  return <Link to={props.link}>{props.children}</Link>
}

export class QuarterlyStories extends React.Component<QuarterlyStoriesProps> {
  render() {
    const params = {
      slidesPerView: 3,
      spaceBetween: 0,
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
            <Swiper {...params}>
              {quarter.stories.map(story => (
                <div>
                  <CustomLink link={story.link}>
                    <div
                      className={css`
                        margin-left: 15px;
                        margin-right: 15px;
                        text-align: center;
                        color: white;
                        background-size: auto 100%;
                        background-position: center;
                        background-image: url(${story.imageURL});
                      `}
                    >
                      <div
                        className={css`
                          height: 50vh;
                          position: relative;
                        `}
                      >
                        <div
                          className={css`
                            position: absolute;
                            bottom: 0;
                            left: 5%;
                            width: 80%;
                          `}
                        >
                          <div
                            className={css`
                              background-color: white;
                              color: black;
                              padding: 20px;
                              position: relative;
                              width: 100%;
                              bottom: 0;
                              left: 0;
                              text-align: left;
                              font-family: Barlow;
                              font-style: italic;
                              font-weight: 500;
                              line-height: normal;
                              font-size: 18px;
                            `}
                          >
                            <div
                              className={css`
                                background-color: black;
                                color: white;
                                padding: 20px;
                                position: absolute;

                                top: -35px;
                                left: -35px;
                                z-index: 100;
                                width: auto;
                                padding: 12px;
                                float: left;
                                font-family: Barlow;
                                font-style: normal;
                                font-weight: 800;
                                line-height: normal;
                                font-size: 24px;
                              `}
                            >
                              {story.title}
                            </div>
                            {story.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CustomLink>
                </div>
              ))}
            </Swiper>
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
