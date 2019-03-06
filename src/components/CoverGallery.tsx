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
        <div className={css`width: 100vw;`}>
        <div className={css`margin-left: 3vw; margin-right: 3vw;`}>
          {this.props.photos.slice(0,3).map((current) =>
            <div className={css`display: inline-block; width: 33.33333333333333333%; /*yikes*/`}>
            <img className={css`
              margin: 0 22px 0 22px;
            `} src={current.photo}/>
            </div>
          )}
        </div>
        </div>
        <div className={css`margin: 0 3vw 0 3vw;`}>
        {this.props.photos.length > 3
          && this.props.photos.slice(0,3).map((current) =>
            <div className={css`width: 25%; display: inline-block;`}>
              <img className={css`
                margin: 0 16px 0 16px;
              `} src={current.photo}/>
            </div>
          )}
        </div>
    </>
    )
  }
}
