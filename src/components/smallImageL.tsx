import * as React from 'react'
import { css } from 'react-emotion'

const imageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: Barlow;
  padding: 0;
  border: none;
  float: left;
  width: 50%;
  line-height: normal;
  margin:  0.5rem 0.5rem 0 -50px;
  @media screen and (max-width: 808px) {
    margin: 0.5rem 0.5rem 0 0;
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

export class CustomSmallImageL extends React.Component<ImageProps> {
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
