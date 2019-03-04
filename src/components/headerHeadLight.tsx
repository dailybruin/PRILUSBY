import * as React from 'react'
import { css } from 'react-emotion'

const headerStyles1 = css`
  position: relative;
  font-family: Barlow;
  font-style: normal;
  font-size: 25px;
  line-height: 43px;
  font-weight: bold;
  line-height: normal;
  height: 32px;
  background: yellow;
  margin-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
`

const headerStyles2 = css`
  font-family: Barlow;
  font-style: normal;
  font-size: 25px;
  line-height: 43px;
  font-weight: bold;
  line-height: normal;
`

export class HeaderHighLight extends React.Component<> {
  render() {
    return (
      <div className={headerStyles1}>
        <div
          className={css`
            position: relative;
            top: -50%;
          `}
        >
          <span
            className={css`
              height: 52px;
              font-size: 2.5 rem;
              font-style: italic;
              font-weight: 900;
              line-height: normal;
            `}
          >
            Testing
          </span>
        </div>
      </div>
    )
  }
}
