import * as React from 'react'
import { css } from 'react-emotion'
import { Link } from 'gatsby'
import MobilePopup from './MobilePopup'
import PRIME from '../images/PRIME.svg'

interface CustomHeaderProps {
  transparent?: boolean
}

const transparent = css`
  position: relative;
  background-color: transparent;
  position: absolute;
  z-index: 100;
  top: 0;
`
const black = css`
  background-color: black;
`
const linkStyle = css`
  display: flex;
  align-items: center;
  font-family: barlow;
  font-size: 24px;
  font-weight: 800;
  a {
    text-decoration: none;
    color: #fff;
    margin-left: 67px;
  }
  @media (max-width: 940px) {
    display: none;
  }
`

export default class CustomHeader extends React.Component<CustomHeaderProps> {
  public static defaultProps = {
    transparent: false,
  }
  render() {
    const curIssue = 'summer23'
    const background = this.props.transparent ? transparent : black
    const headerStyle = css`
      width: 100%;
      display: flex;
      align-items: center;
      position: relative;
      z-index: 100;
      @media (max-width: 940px) {
        justify-content: flex-start;
      }
      @media (min-width: 940px) {
        padding-left: 46px;
      }
      ${background};
    `
    return (
      <div className={headerStyle}>
        <MobilePopup>
          {[
            <Link key={1} to="/about">
              about
            </Link>,
            <Link key={2} to={`/${curIssue}`}>
              current issue
            </Link>,
            <Link key={3} to="/pastissues">
              past issues
            </Link>,
            <Link key={4} to="/all">
              all stories
            </Link>,
          ]}
        </MobilePopup>
        <Link to="/">
          <img
            src={PRIME}
            className={css`
              @media screen and (max-width: 940px) {
                width: 60vw;
                max-height: 125px;
                margin: 0 auto 0 75px;
              }
            `}
          />
        </Link>
        <div className={linkStyle}>
          <Link to="/about">about</Link>
          <Link to={`/${curIssue}`}>current issue</Link>
          <Link to="/pastissues">past issues</Link>
          <Link to="/all">all stories</Link>
        </div>
      </div>
    )
  }
}
