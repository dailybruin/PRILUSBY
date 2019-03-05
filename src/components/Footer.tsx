import * as React from 'react'
import { Link } from 'gatsby'
import { css } from 'react-emotion'
import RectangleLogos from '../images/RectangleLogos.png'

export function Footer() {
  return (
    <footer
      className={css`
        align-items: center;
        margin: 0 0;
        padding: 0 0;
        color: white;
        background: black;
        height: 207px;
        @media (max-width: 600px) {
          display: none;
        }
      `}
  >
      <div
      className={css`
        align-items: center;
        display: flex;
      `}
      >
        <div className={css`
          margin-right: auto;
          flex: 1;
        `}>
        </div>
        <div
        className={css`
          font-family: EB Garamond;
          font-style: normal;
          line-height: normal;
          font-size: 64px;
          padding: 8px;
          `}>
          DAILY BRUIN
        </div>
        <div className={css`margin-left: auto
          justify-content: space-evenly;
          text-align: center;
          flex: 1;
          padding: 0px`}>
          <img className={css`margin: 8px;
                              margin-left: 80px;
                              margin-bottom: 0px;
                              @media (max-width: 980px) {
                                display: none;
                              }`} src={RectangleLogos}/>
          <img className={css`margin: 8px; margin-bottom: 0px;@media (max-width: 980px) {display: none;}`} src={RectangleLogos}/>
          <img className={css`margin: 8px; margin-bottom: 0px;@media (max-width: 980px) {display: none;}`} src={RectangleLogos}/>
        </div>
      </div>

      <div
      className={css`
        font-family: Barlow;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        font-size: 18px;
        text-align: center;
        padding-top: 5px;
        @media (max-width:731px) {
          font-size: 14px;
        }
        `}>
        <div>
        PRIME is the official website for the Daily Bruin's quarterly arts, culture, and lifestyle magazine.
        </div>
        <div>
        © UCLA Student Media 1998 - 2018
        </div>
        <div>
        Built with love at 118 Kerckhoff Hall
        </div>
      </div>



  </footer>
  )
}
