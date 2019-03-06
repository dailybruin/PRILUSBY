import * as React from 'react'
import { css } from 'react-emotion'

const pullImageStyle = css`
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
  float: right;
  width: 70%;
  @media screen and (max-width: 808px) {
    float: none;
    text-align: center;
    width: 100%;
    margin:0;
  }
  margin: 10px -190px 24px 36px;
  position: relative;
  top: 5px;
`
const captionStyle= css`
font-family: Barlow;
font-style: normal;
font-weight: 600;
line-height: normal;
font-size: 18px;
position:relative;
@media screen and (max-width: 606px) {
    float: none;
    text-align: center;
    width: 100%;
}
`

const rando= css`
width: 50%;
height:50%;
margin-bottom:0;
@media screen and (max-width: 606px) {
    float: none;
    text-align: center;
    width: 100%;

}
`
interface ImageProps {
  url: string
  caption: string
  credit: string
  alt: string
  position: string
  /** Custom css for the image component */
  style?: string
}

export class CustomPullImage extends React.Component<ImageProps> {
  render() {
    console.log('THIS IS POSITION: ', this.props.position)
    return (
      <div>
        {this.props.position == 'center' ? (
          <figure
            className={css`
              ${pullImageStyle};
              float: none;
              width: 100%;
              margin:0;
            `}
          >
            <img
              className={css`
                /* width: 50%;
                height: 50%; */

              `}
              src={this.props.url}
              alt={this.props.alt}
            />
            <div>
            <figcaption className={css`${captionStyle};
            text-align:center;`}>
              {this.props.caption} // ({this.props.credit})
            </figcaption>

            </div>

          </figure>
        ) : this.props.position == 'left' ? (
          <figure
            className={css`
              ${pullImageStyle};
              float: left;
            `}
          >
            <img
              className={rando}
              src={this.props.url}
              alt={this.props.alt}
            />
            <div className={css`margin-left:-100px;`}>
            <figcaption className={css`${captionStyle};
            text-align:left;
            float:left;
            `}>
              {this.props.caption} // ({this.props.credit})
            </figcaption>

            </div>

          </figure>
        ) : (
          <figure className={pullImageStyle}>
            <img
              className={rando}
              src={this.props.url}
              alt={this.props.alt}
            />
            <div className={css`margin-right:25px;`}>
            <figcaption className={css`${captionStyle};
            text-align:right;`}>
              {this.props.caption}
              // ({this.props.credit})
            </figcaption>
            </div>

          </figure>
        )}
      </div>
    )
  }
}
