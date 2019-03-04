import * as React from 'react'
import { css } from 'react-emotion'

const pullQuoteStyle = css`
  display: flex;
  flex-direction: column;
  font-family: Barlow;
  font-style: normal;
  font-size: 25px;
  line-height: 43px;
  font-weight: bold;
  line-height: normal;
  padding: 0;
  border: none;
  float: left;
  width: 70%;
  @media screen and (max-width: 808px) {
    float: none;
    text-align: center;
    width: 100%;
  }
  margin: 10px -190px 24px 36px;
  position: relative;
  top: 5px;
`
interface ImageProps {
  url: string
  caption: string
  credit: string
  alt: string
  /** Custom css for the image component */
  style?: string
}

export class CustomPullImage extends React.Component<ImageProps> {
  render() {
    return (
      <figure className={pullQuoteStyle}>
        <img
          className={css`
            width: 50%;
            height: 50%;
            margin-bottom: 0;
          `}
          src={this.props.url}
          alt={this.props.alt}
        />
        <figcaption>
          {this.props.caption} ({this.props.credit})
        </figcaption>
      </figure>
    )
  }
}
