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
        width: 100%;
      `}
    >
      <div
        className={css`
          align-items: center;
          display: flex;
          justify-content: center;
          @media (max-width: 650px) {
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}
      >
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
        <div>© UCLA Student Media 1998 - 2021</div>
        <div>Built with love at 118 Kerckhoff Hall</div>
      </div>
    </footer>
  )
}
