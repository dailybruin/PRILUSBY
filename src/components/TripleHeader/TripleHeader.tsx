import * as React from 'react'
import { css } from 'react-emotion'
import { HeaderHighLight } from './HeaderHighLight'
import Gallery from 'react-photo-gallery'
import { Link } from 'gatsby'
import slugify from 'slugify'
interface TripleHeaderProps {
  term: string
  title: string
  description: string
  imageURL: string
  slug: string
}

export class TripleHeader extends React.Component<TripleHeaderProps, {}> {
  render() {
    const TripleHeaderStyle = css`
      width: 100%;
      overflow: hidden;
    `
    const titleStyle = css`
      font-weight: 900;
      font-size: 36px;
      font-style: italic;
    `
    const blurbStyle = css`
      width: 653px;
      font-family: Barlow;
      text-align: right;
      position: absolute;
      background-color: #fff;
      margin-top: 10%;
      margin-left: 5%;
      padding: 15px;
      padding-left: 30px;
      color: black;
      text-decoration: none;
    `
    const descriptionStyle = css`
      font-weight: 400;
      font-size: 24px;
      margin-top: 10px;
    `
    const photos = [
      {
        src: this.props.imageURL,
        width: 7,
        height: 5,
      },
      {
        src: this.props.imageURL,
        width: 7,
        height: 5,
      },
      {
        src: this.props.imageURL,
        width: 7,
        height: 5,
      },
    ]
    return (
      <div className={TripleHeaderStyle}>
        <Link to={`/${this.props.slug.split('.').join('')}`}>
          <div className={blurbStyle}>
            <div className={titleStyle}>{this.props.term}</div>
            <div>
              <HeaderHighLight
                title={this.props.title}
                highlightPosition="bottom"
                textAlign="right"
                fullWidth={true}
              />
            </div>
            <div className={descriptionStyle}>{this.props.description}</div>
          </div>
        </Link>
        <div
          className={css`
            margin-left: -20%;
            margin-right: -35%;
            & img {
              object-fit: cover;
            }
          `}
        >
          <Gallery photos={photos} columns={3} margin={8} />
        </div>
      </div>
    )
  }
}
