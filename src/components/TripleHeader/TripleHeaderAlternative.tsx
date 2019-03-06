import * as React from 'react'
import { css } from 'react-emotion'
import { HeaderHighLight } from './HeaderHighLight'
import Gallery from 'react-photo-gallery'
interface TripleHeaderAlternativeProps {
  issue: string
  title: string
  description: string
  imageURL: string
}

export class TripleHeaderAlternative extends React.Component<TripleHeaderAlternativeProps, {}> {
  render() {
    return (
      <div className={css`
        font-family: Barlow;
      `}>
        <div className={css`
          position: relative;
          z-index: 1;
          width: 80%;
          background-color: white;
          margin: 0 auto;
          padding: 1rem;
        `}>
          <div className={css`
            font-size: 1rem;
            font-weight: bold;
          `}>{this.props.issue}</div>
          <div className={css`
            font-size: 2rem;
            font-weight: bold;
            font-style: italic;
          `}>{this.props.title}</div>
          <div className={css`
            font-size: 1rem;
            font-style: italic;
          `}>{this.props.description}</div>
        </div>
        <img src={this.props.imageURL} className={css`
          width: 100%;
          position: relative;
          z-index: 0;
          transform: translateY(-1rem);
        `}/>
      </div>
    )
  }
}
