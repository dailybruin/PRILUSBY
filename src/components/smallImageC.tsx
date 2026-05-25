import * as React from 'react'
import { css } from 'react-emotion'

const imageStyle = css`
  display: flex;
  flex-direction: column;
  font-family: Barlow;
  padding: 0;
  border: none;
  float: none;
  width: 50%;
  line-height: normal;
  margin: 0 auto 1rem auto;
  @media screen and (max-width: 808px) {
  }
`
interface ImageProps {
    url: string
    caption: string
    credit: string
    alt: string
    /** Custom css for the image component */
    style?: string
}

export class CustomSmallImageC extends React.Component<ImageProps> {
    render() {
        return (
            <figure className={imageStyle}>
                <img
                    className={css`
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
