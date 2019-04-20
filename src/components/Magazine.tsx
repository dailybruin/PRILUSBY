import * as React from 'react'
import { css } from 'emotion'

interface MagazineProps {
  link: string
}

export class Magazine extends React.Component<MagazineProps> {
  render() {
    return (
      <div
        className={css`
          width: 95%;
          margin: auto;
          display: flex;
          @media screen and (max-width: 800px) {
            flex-wrap: wrap;
          }
        `}
      >
        <div
          className={css`
            display: inline-block;
            font-family: Barlow;
            font-style: italic;
            font-size: 2.5rem;
            font-weight: bold;
            min-width: 30vw;
            @media screen and (min-width: 800px) {
              text-align: right;
              margin: 0 2rem auto auto;
            }
          `}
        >
          <div>FULL PRINT</div>
          <div
            className={css`
              position: relative;
              z-index: 1;
            `}
          >
            MAGAZINE
          </div>
          <div
            className={css`
              text-align: right;
              width: 15rem;
              margin: 0 0 auto auto;
              position: relative;
              z-index: 0;
              background-color: #fff96b;
              height: 2rem;
              transform: translateY(-2rem);
              @media screen and (max-width: 800px) {
                width: 80vw;
              }
            `}
          />
        </div>
        <iframe
          src={this.props.link}
          className={css`
            display: inline-block;
            width: 80%;
            height: 80vh;
            margin: 0 auto;
          `}
        />
      </div>
    )
  }
}
