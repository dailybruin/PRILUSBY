import * as React from 'react'
import { css } from 'react-emotion'

const pullQuoteStyle = css`
  display: flex;
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
  }
  margin: 10px -190px 24px 36px;
  position: relative;
  top: 5px;
`
const rectangleStyle = css`
  width: 185px;
  height: 52px;
  background: yellow;
  margin-top: 10px;
  padding-top: 5px;
  padding-left: 10px;
`
const rectangleStyle2 = css`
  width: 185px;
  height: 52px;
  background: yellow;
  margin-top: 10px;
  padding-top: 5px;
`
interface PullQuoteProps {
  caption?: string
  Caption?: string
}

/** A footer to go at the bottom of every page. */
export class CustomPullQuote extends React.Component<PullQuoteProps> {
  render() {
    // 1) prefer lowercase `caption`; 2) else use uppercase `Caption`; 3) else default to empty
    const text = this.props.caption ?? this.props.Caption ?? ''
    return (
      <div>
        {/* <div className={rectangleStyle} /> */}
        <div className={pullQuoteStyle}>
          <div
            className={css`
              margin-left: 10px;
              width: calc(100% - 100px);
            `}
          >
            {text.split(' ').map((s, i) => {
              return (
                <React.Fragment key={i}>
                  {i === 0 ? (
                    <span className={rectangleStyle}>"{s}</span>
                  ) : i === 1 ? (
                    <span className={rectangleStyle2}> {s}</span>
                  ) : (
                    <span> {s}</span>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
