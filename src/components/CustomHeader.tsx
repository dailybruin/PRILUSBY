import * as React from 'react'
import { css } from 'react-emotion'
import { Link } from 'gatsby'
import MobilePopup from './MobilePopup'
import PRIME from '../images/PRIME.svg'

interface CustomHeaderProps {
  transparent?: boolean
}

interface CustomHeaderState {
  searchActive: boolean
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

const searchBoxWrapStyle = css`
  position: relative;
  width: 350px;
  height: 40px;
  margin-left: 67px;
  
  &.active .search_btn {
    top: 0;
    right: 0;
  }
  
  &.active .input_search {
    padding: 12px 25px;
    padding-right: 70px;
    width: 100%;
    background: #fff;
    transition: all 0.5s ease;
  }
  
  @media (max-width: 940px) {
    display: none;
  }
`

const inputSearchStyle = css`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  border: 0;
  height: 40px;
  padding: 12px 0px;
  padding-right: 60px;
  font-size: 16px;
  border-radius: 35px;
  color: transparent;
  background: transparent;
  transition: all 0.2s ease;
  outline: none;
  
  &::placeholder {
    color: #b5b5b5;
    opacity: 1;
  }
  
  &:focus {
    outline: none;
  }
`

const searchBtnStyle = css`
  width: 40px;
  height: 40px;
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.5s ease;
  border: none;
  color: #fff;
  background: #000;
  top: 0;
  right: 0px;
  font-size: 20px;
  z-index: 999;
  outline: none;
  
  &:hover {
    background: #333;
  }
  
  &:focus {
    outline: none;
  }
`

const iconStyle = css`
  display: flex;
  font-size: inherit;
`

const mobileSearchLinkStyle = css`
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  display: block;
`

export default class CustomHeader extends React.Component<CustomHeaderProps, CustomHeaderState> {
  public static defaultProps = {
    transparent: false,
  }
  
  private inputRef = React.createRef<HTMLInputElement>()
  
  state: CustomHeaderState = {
    searchActive: false
  }
  
  handleSearchToggle = () => {
    this.setState(
      prevState => ({ searchActive: !prevState.searchActive }),
      () => {
        if (this.state.searchActive && this.inputRef.current) {
          this.inputRef.current.focus()
        }
      }
    )
  }
  
  render() {
    const curIssue = 'summer25'
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
            <a key={0} className={mobileSearchLinkStyle} onClick={this.handleSearchToggle}>
              search
            </a>,
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
        
        <div className={`${searchBoxWrapStyle} ${this.state.searchActive ? 'active' : ''}`}>
          <div>
            <input 
              ref={this.inputRef}
              type="text" 
              name="search" 
              placeholder="Search" 
              className={`input_search ${inputSearchStyle}`}
            />
          </div>
          <button 
            className={`search_btn ${searchBtnStyle}`}
            onClick={this.handleSearchToggle}
            aria-label={this.state.searchActive ? "Close search" : "Search"}
          >
            <span className={iconStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" fill="currentColor">
                <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    )
  }
}