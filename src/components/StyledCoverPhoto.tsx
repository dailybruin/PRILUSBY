import React from 'react'
import { css, cx } from 'emotion'

import { toSentence } from '@dailybruin/lux'

interface StyledCoverPhotoProps {
    title: string,
    authors: string[],
    photographers: string[],
    description: string,
    quarter: string,
    imageURL: string,
}

export class StyledCoverPhoto extends React.Component<StyledCoverPhotoProps> {

  render() {
    return (
      <div className={css`
        position: relative;
        height: 100vh;
      `}>
        <div className={css`
          position: absolute;
          top: 45%;
          right: 0;
          width: 5%;
          height: 38%;
        `}>
          <div className={css`
            padding: 10% 5% 10% 20%;
            height: 25%;
          `}>
            <div className={css`
              position: relative;
              border-style: solid;
              border-width: thin;
              border-radius: 50%;
              width: 100%;
              height: auto;
              padding-top: 100%;
              background: white;           
            `}></div>
          </div>
          <div className={css`
            padding: 10% 5% 10% 20%;
            height: 25%;
          `}>
            <div className={css`
              position: relative;
              border-style: solid;
              border-width: thin;
              border-radius: 50%;
              width: 100%;
              height: auto;
              padding-top: 100%;
              background: white;           
            `}></div>
          </div>
          <div className={css`
            padding: 10% 5% 10% 20%;
            height: 25%;
          `}>
            <div className={css`
              position: relative;
              border-style: solid;
              border-width: thin;
              border-radius: 50%;
              width: 100%;
              height: auto;
              padding-top: 100%;
              background: white;           
            `}></div>
          </div>
          <div className={css`
            padding: 10% 5% 10% 20%;
            height: 25%;
          `}>
            <div className={css`
              position: relative;
              border-style: solid;
              border-width: thin;
              border-radius: 50%;
              width: 100%;
              height: auto;
              padding-top: 100%;
              background: white;           
            `}></div>
          </div>
        </div>
        <div className={css`
          position: absolute;
          top: 0;
          right: 88%;
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
        `}>
          { this.props.quarter }
        </div>     
        <div className={css`
          position: absolute;
          width: 83%;
          height: 83%;
          top: 0;
          right: 5%;
          background-size: 100% auto;
          background-image: url(${ this.props.imageURL });
        `}>
        </div>
        <div className={css`
          position: absolute;
          width: 60%;
          height: 25%;
          bottom: 0;
          left: 0;
          background-color: white;
          color: black;
          text-align: right;
          padding: 20px;
        `}>
          <h1 className={css`
            margin-bottom: 10px;
            font-family: Barlow;
            font-style: normal;
            line-height: normal;
            font-size: 48px;
          `}><b>{ this.props.title }</b> </h1>
          <h2 className={css`
            font-family: Barlow;
            font-style: normal;
            line-height: normal;
            font-size: 18px;
          `}>BY { toSentence(this.props.authors).toUpperCase() }{ this.props.photographers && " // PHOTOS BY " + toSentence(this.props.photographers).toUpperCase() }
          </h2>
        </div>
      </div>
    )
  }
}