import * as React from 'react'
import { Link } from 'gatsby'
import { css } from 'react-emotion'

interface ArticleCardProps {
  blackCardFontSize: number
  whiteCardFontSize: number
  blackCardText: string
  whiteCardText: string
  imageSrc: string
  imageHeightVW: number
  imageHeightMobileVW?: number
  aType: string
  slug: string
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

export class ArticleCard extends React.Component<ArticleCardProps> {
  render() {
    return (
      <CustomLink
        className={css`
          width: 100%;
        `}
        link={
          this.props.aType !== 'article' && this.props.aType !== 'graphic'
            ? this.props.aType
            : `/${this.props.slug.split('.').join('')}`
        }
      >
        <div
          className={css`
            width: 100%;
            color: white;
            text-align: center;
          `}
        >
          <div
            className={css`
              position: relative;
              height: ${this.props.imageHeightVW}vw;
              ${!!this.props.imageHeightMobileVW
                ? `
            @media screen and (max-width: 940px) {
            height: ${this.props.imageHeightMobileVW}vw;
            }
            `
                : ''}
              background-size: auto 100%;
              background-position: center;
              background-image: url(${this.props.imageSrc});
            `}
          >
            <div
              className={css`
                position: absolute;
                bottom: -2.5%;
                left: 6%;
                width: 88%;
              `}
            >
              <div
                className={css`
                  background-color: white;
                  color: black;
                  padding: 10px;
                  position: relative;

                  bottom: 0;
                  left: 0;
                  text-align: left;
                  font-family: Barlow;
                  font-style: italic;
                  font-weight: 400;
                  line-height: normal;
                  font-size: ${this.props.whiteCardFontSize}rem;
                `}
              >
                <div
                  className={css`
                    background-color: black;
                    color: white;
                    padding: 20px;
                    position: absolute;
                    top: ${this.props.whiteCardFontSize < 1 ? -30 : -40}px;
                    left: ${this.props.whiteCardFontSize < 1 ? -30 : -40}px;
                    z-index: 100;
                    width: auto;
                    padding: 10px;
                    float: left;
                    font-family: Barlow;
                    font-style: normal;
                    font-weight: 800;
                    line-height: normal;
                    font-size: ${this.props.blackCardFontSize}rem;
                  `}
                >
                  {this.props.blackCardText}
                </div>
                {this.props.whiteCardText}
              </div>
            </div>
          </div>
        </div>
      </CustomLink>
    )
  }
}
