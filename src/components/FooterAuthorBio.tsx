import React from 'react'
import { css, cx } from 'emotion'
import Swiper from 'react-id-swiper'

import { toSentence } from '@dailybruin/lux'

import './styles.css'

interface FooterAuthorBioProps {
  name: String,
  email: String,
  handle: String,
  bio: String,
}

export class FooterAuthorBio extends React.Component<FooterAuthorBioProps> {

  render() {
    if (typeof document == 'undefined') {
      return null
    }

    return (
      <div className={css`
        width: 100%;
        height: auto;
        background-color: black;
        color: white;
        text-align: center;
        vertical-align: center;
        display: flex;
        align-items: center;
        justify-content: center;

        font-family: Barlow;
        font-style: normal;
        line-height: normal;
        font-size: 24px;
        text-align: center;

        @media (max-width: 768px) {
          font-size: 18px;
        }
      `}>
        <div className={css`
          max-width: 50%;
          margin: 50px;
        `}>
          <p className={css`
            margin: 0;
          `}><b>{ this.props.name }</b> // { this.props.email } // { this.props.handle }</p>
          <p className={css`
            margin: 0;
          `}>{ this.props.bio }</p>
        </div>
      </div>
    )
  }
}
