import * as React from 'react'
import { css } from 'emotion'

import './styles.css'
import { Link } from 'gatsby'

interface CoverPhotosProps {
  photos: {
    coverphoto: string
    term: string
  }[]
}

export class CoverGallery extends React.Component<CoverPhotosProps> {
  render() {
    return (
      <>
        <div
          className={css`
            width: 100%;
            height: 100%;
          `}
        >
          <div
            className={css`
              display: flex;
              padding-left: 3vw;
              padding-right: 3vw;
              justify-content: space-evenly;
              align-items: center;
              @media screen and (max-width: 900px) {
                flex-direction: column;
              }
            `}
          >
            {this.props.photos.slice(0, 3).map(current => (
              <div
                className={css`
                  padding-top: 10px;
                  padding-bottom: 10px;
                `}
              >
                <Link to={current.term}>
                  <img
                    className={css`
                      max-width: 431px;
                      max-height: 550px;
                      height: 40vw;
                      width: auto;
                      margin: 0px;
                      overflow: hidden;
                      @media screen and (max-width: 900px) {
                        width: 100%;
                        height: auto;
                      }
                    `}
                    src={current.coverphoto}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div
          className={css`
            padding: 0 3vw 0 3vw;
          `}
        >
          {this.props.photos.length > 3 &&
            this.props.photos.slice(3).map(current => (
              <Link to={current.term}>
                <div
                  className={css`
                    width: 25%;
                    display: inline-block;
                    @media (max-width: 667px) {
                      width: 100%;
                      text-align: center;
                    }
                  `}
                >
                  <img
                    className={css`
                      padding: 10px;
                      padding-top: 10px;
                      padding-bottom: 0px;
                      &:hover {
                        padding-top: 0px;
                        padding-bottom: 10px;
                      }
                    `}
                    src={current.coverphoto}
                  />
                </div>
              </Link>
            ))}
        </div>
      </>
    )
  }
}
