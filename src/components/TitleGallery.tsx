import React from 'react'
import { css } from 'emotion'
import Swiper from 'react-id-swiper'
import { Link } from 'gatsby'
import { toSentence } from '@dailybruin/lux'

import './styles.css'

interface TitleGalleryProps {
  stories: {
    title: string
    authors: string[]
    description: string
    quarter: string
    imageURL: string
    slug: string
  }[]
}

export class TitleGallery extends React.Component<TitleGalleryProps> {
  render() {
    if (typeof document == 'undefined') {
      return null
    }
    const params = {
      ContainerEl: 'section',
      WrapperEl: 'section',
      pagination: {
        el: '.custom-pagination',
        clickable: true,
      },
      loop: true,
    }

    return (
      <div>
        <link
          href="https://fonts.googleapis.com/css?family=Barlow"
          rel="stylesheet"
        />
        <Swiper {...params}>
          {this.props.stories.map(story => (
            <Link to={`/${story.slug.split('.').join('')}`}>
              <div
                className={css`
                  text-align: center;
                  color: white;
                  background-size: cover;
                  background-image: url(${story.imageURL});
                  background-position: center;
                `}
              >
                <div
                  className={css`
                    height: 100vh;
                    position: relative;
                  `}
                >
                  <div
                    className={css`
                      position: absolute;
                      bottom: 0;
                      left: 13%;
                      width: 56%;
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
                      `}
                    >
                      <div
                        className={css`
                          background-color: black;
                          color: white;
                          padding: 20px;
                          position: absolute;

                          top: -35px;
                          left: -25px;
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
                        {story.quarter}
                      </div>
                      <table>
                        <tbody>
                          <tr className={css``}>
                            <h1
                              className={css`
                                display: inline;
                                font-family: Barlow;
                                font-style: normal;
                                font-weight: 800;
                                line-height: normal;
                                font-size: 36px;
                              `}
                            >
                              {story.title}{' '}
                            </h1>
                            <h2
                              className={css`
                                display: inline;
                                font-family: Barlow;
                                font-style: italic;
                                font-weight: 500;
                                line-height: normal;
                                font-size: 18px;
                              `}
                            >
                              BY {toSentence(story.authors).toUpperCase()}
                            </h2>
                          </tr>
                          <tr>
                            <p
                              className={css`
                                float: left;
                                text-align: left;

                                font-family: Barlow;
                                font-style: italic;
                                font-weight: 500;
                                line-height: normal;
                                font-size: 18px;
                              `}
                            >
                              {story.description}
                            </p>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Swiper>
      </div>
    )
  }
}
