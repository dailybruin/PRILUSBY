import * as React from 'react'
import { css } from 'react-emotion'
interface HeaderProps {
  title: string
  highlightPosition: string
  textAlign: string
  fullWidth: boolean
  style?: string
}
export class HeaderHighLight extends React.Component<HeaderProps, {}> {
  render() {
    return (
      <div
        className={css`
          display: ${this.props.fullWidth ? 'block' : 'inline-block'};
          font-family: Barlow;
          font-style: italic;
          font-size: 2rem;
          font-weight: bold;
          height: 30px;
          background: #fff96b;
          padding-left: ${this.props.textAlign === 'left' ? 5 : 20}px;
          padding-right: ${this.props.textAlign === 'left' ? 5 : 20}px;
        `}
      >
        <div
          className={css`
            position: relative;
            width: 100%;
            top: ${this.props.highlightPosition === 'top' ? 5 : -20}px;
            text-align: ${this.props.textAlign === 'left' ? 'left' : 'right'};
          `}
        >
          {this.props.title}
        </div>
      </div>
    )
  }
}
