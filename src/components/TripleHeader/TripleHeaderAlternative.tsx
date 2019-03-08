import * as React from 'react'
import { css } from 'react-emotion'
import { HeaderHighLight } from './HeaderHighLight'
import Gallery from 'react-photo-gallery'
import { Link } from 'gatsby'
interface TripleHeaderAlternativeProps {
  issue: string
  title: string
  description: string
  imageURL: string
  slug: string
}

export class TripleHeaderAlternative extends React.Component<
  TripleHeaderAlternativeProps,
  {}
> {
  render() {
    return (
      <div
        className={css`
          font-family: Barlow;
          color: black;
          text-decoration: none;
        `}
      >
        <Link
          className={css`
            text-decoration: none;
            color: black;
          `}
          to={this.props.slug.split('.').join('')}
        >
          <div
            className={css`
              position: relative;
              z-index: 1;
              width: 80%;
              background-color: white;
              margin: 0 auto;
              padding: 1rem;
              text-decoration: none;
              color: black;
            `}
          >
            <div
              className={css`
                font-size: 1rem;
                font-weight: bold;
                text-decoration: none;
                color: black;
              `}
            >
              {this.props.issue}
            </div>
            <HeaderHighLight
              title={this.props.title}
              textAlign="left"
              highlightPosition="bottom"
              fullWidth={false}
            />
            <div
              className={css`
                font-size: 1rem;
                font-style: italic;
                text-decoration: none;
              `}
            >
              {this.props.description}
            </div>
          </div>
          <img
            src={this.props.imageURL}
            className={css`
              width: 100%;
              position: relative;
              z-index: 0;
              transform: translateY(-1rem);
            `}
          />
        </Link>
      </div>
    )
  }
}
