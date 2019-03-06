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
    const background = this.props.transparent ? transparent : black
    const headerStyle = css`
      width: 100%;
      display: flex;
      align-items: center;
      position: relative;
      z-index: 100000;
      @media (max-width: 940px) {
        justify-content: space-between;
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
            <Link to="/about">about</Link>,
            <Link to="/current">current issue</Link>,
            <Link to="/about">past issues</Link>,
            <Link to="/all">all stories</Link>,
          ]}
        </MobilePopup>
        <img src={PRIME} className={css`
          @media screen and (max-width: 940px) {
            width: 60vw;
            margin: 0 auto;
          }
        `}/>
        <div className={linkStyle}>
          <Link to="/about">about</Link>
          <Link to="/current">current issue</Link>
          <Link to="/about">past issues</Link>
          <Link to="/all">all stories</Link>
        </div>
      </div>
    )
  }
}
