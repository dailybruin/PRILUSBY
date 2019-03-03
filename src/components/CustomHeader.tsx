import * as React from 'react'
import { css } from 'react-emotion'
import { Link } from 'gatsby'
const prime = require('../images/prime.png')

interface CustomHeaderProps {
  transparent?: boolean
}

const transparent = css`
  background-color: transparent;
  position: absolute;
  z-index: 1;
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
      padding-left: 46px;
      ${background};
    `
    return (
      <div className={headerStyle}>
        <img src={prime} />
        <div className={linkStyle}>
          <Link to="/about">about</Link>
          <Link to="/current">current issue</Link>
          <Link to="/about">past issue</Link>
          <Link to="/all">all stories</Link>
        </div>
      </div>
    )
  }
}
