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
        height: 200px;
      `}
    >
      <div
        className={css`
          align-items: center;
          display: flex;
          justify-content: space-evenly;
          @media (max-width: 650px) {
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}
      >
        <div
          className={css`
            width: 200px;
            height: 5px;
          `}
        />
        <div
          className={css`
            font-family: EB Garamond;
            font-style: normal;
            line-height: normal;
            font-size: 64px;
            padding: 8px;
            @media (max-width: 980px) {
              font-size: 2rem;
            }
          `}
        >
          DAILY BRUIN
        </div>
        <div
          className={css`
            justify-content: space-evenly;
            text-align: center;
            padding: 0px;
            @media (max-width: 980px) {
              margin: 0;
            }
          `}
        >
          <img
            className={css`
              margin: 8px;
              margin-bottom: 0px;
              width: 40px;
              height: 40px;
              @media (max-width: 650px) {
                /*display: none;*/
                margin-left: 8px;
                width: 30px;
                height: 30px;
              }
            `}
            src={RectangleLogos}
          />
          <img
            className={css`
              margin: 8px;
              margin-bottom: 0px;
              width: 40px;
              height: 40px;
              @media (max-width: 650px) {
                /*display: none;*/
                width: 30px;
                height: 30px;
              }
            `}
            src={RectangleLogos}
          />
          <img
            className={css`
              margin: 8px;
              margin-bottom: 0px;
              width: 40px;
              height: 40px;
              @media (max-width: 650px) {
                /*display: none;*/
                width: 30px;
                height: 30px;
              }
            `}
            src={RectangleLogos}
          />
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
          @media (max-width: 731px) {
            font-size: 14px;
          }
        `}
      >
        <div>
          PRIME is the official website for the Daily Bruin's quarterly arts,
          culture, and lifestyle magazine.
        </div>
        <div>© UCLA Student Media 1998 - 2018</div>
        <div>Built with love at 118 Kerckhoff Hall</div>
      </div>
    </footer>
  )
}
