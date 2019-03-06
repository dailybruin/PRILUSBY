import * as React from 'react'
import { css } from 'emotion'

import './styles.css'

interface CoverPhotosProps {
  photos: {
    photo: string,
  }[]
}

export class CoverGallery extends React.Component<CoverPhotosProps> {

  render() {
    return (
      <>
        <div className={css`width: 100%`}>
          <div className={css`padding-left: 3vw; padding-right: 3vw;`}>
            {this.props.photos.slice(0,3).map((current) =>
              <div className={css`
                display: inline-block; 
                width: 33.33333333333333333%; /*yikes*/
                @media (max-width: 667px) {
                  width: 100%;
                  text-align: center;
                }
              `}>
                <img className={css`
                  padding: 10px;
                  padding-top: 20px;
                  padding-bottom: 0px;
                `} src={current.photo}/>
              </div>
            )}
          </div>
        </div>
        <div className={css`padding: 0 3vw 0 3vw;`}>
        {this.props.photos.length > 3
          && this.props.photos.slice(3).map((current) =>
            <div className={css`
              width: 25%; 
              display: inline-block;
              @media (max-width: 667px) {
                width: 100%;
                text-align: center;
              }
            `}>
              <img className={css`
                padding: 10px;
                padding-top: 0px;
                padding-bottom: 0px;
              `} src={current.photo}/>
            </div>
          )}
        </div>
      </>
    )
  }
}
