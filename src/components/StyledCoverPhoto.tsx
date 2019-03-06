import React from 'react'
import { css, cx } from 'emotion'

import { toSentence } from '@dailybruin/lux'
import { SocialIcon } from 'react-social-icons'

interface StyledCoverPhotoProps {
  title: string
  authors: string[]
  photographers: string[]
  description: string
  quarter: string
  imageURL: string
  socialMediaLinks: string[]
}

export class StyledCoverPhoto extends React.Component<StyledCoverPhotoProps> {
  render() {
    return (
      <div
        className={css`
          position: relative;
          height: 100vh;
        `}
      >
        <div
          className={css`
            position: absolute;
            width: 80%;
            height: 80%;
            top: 0;
            right: 10%;
            background-size: cover;
            background-image: url(${this.props.imageURL});
            background-position: center;
            @media (max-width: 768px) {
              right: 40px;
            }
          `}
        >
          <div
            className={css`
              position: absolute;
              top: 0;
              left: -42px;
              background-color: white;

              writing-mode: vertical-rl;
              transform: rotate(180deg);

              font-family: Barlow;
              font-style: normal;
              font-weight: 800;
              line-height: normal;
              font-size: 24px;
              text-align: right;
              margin: 10px;
            `}
          >
            {this.props.quarter}
          </div>
          <div
            className={css`
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
              @media (min-width: 768px) {
                display: none;
              }
            `}
          >
            {this.props.socialMediaLinks &&
              this.props.socialMediaLinks.map(link => (
                <SocialIcon
                  url={link}
                  className={css`
                    margin: 10px;
                    background-color: white;
                    border-radius: 50%;
                  `}
                />
              ))}
          </div>
          <div
            className={css`
              position: absolute;
              bottom: 0;
              right: -3%;
              width: 3%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              @media (max-width: 768px) {
                display: none;
              }
            `}
          >
            {this.props.socialMediaLinks &&
              this.props.socialMediaLinks.map(link => (
                <SocialIcon
                  url={link}
                  className={css`
                    margin: 10px;
                    background-color: white;
                    border-radius: 50%;
                  `}
                />
              ))}
          </div>
        </div>
        <div
          className={css`
            position: absolute;
            width: 60%;
            height: auto;
            bottom: 0;
            left: 0;
            background-color: white;
            color: black;
            text-align: right;
            padding: 10px;
            padding-bottom: 40px;
            @media (max-width: 768px) {
              padding: 10px;
              paddin-bottom: 30px;
            }
          `}
        >
          <h1
            className={css`
              margin: 10px;
              font-family: Barlow;
              font-style: normal;
              line-height: normal;
              font-size: 48px;
              @media (max-width: 768px) {
                font-size: 36px;
              }
            `}
          >
            <b>{this.props.title}</b>{' '}
          </h1>
          <p
            className={css`
              font-family: Barlow;
              font-style: normal;
              line-height: normal;
              font-size: 18px;
              @media (max-width: 768px) {
                font-size: 14px;
              }
            `}
          >
            BY {toSentence(this.props.authors).toUpperCase()}
            {this.props.photographers &&
              ' // PHOTOS BY ' +
                toSentence(this.props.photographers).toUpperCase()}
          </p>
        </div>
      </div>
    )
  }
}
