import React from 'react'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'
import { css } from 'react-emotion'
const panel = require('../images/panel.png')

const photos = [
  {
    src: panel,
    width: 5,
    height: 7,
  },
  {
    src: panel,
    width: 5,
    height: 7,
  },
  {
    src: panel,
    width: 5,
    height: 7,
  },
  {
    src: panel,
    width: 5,
    height: 7,
  },
]

interface GraphicNovelState {
  currentImage: number
  lightboxIsOpen: boolean
}
export default class GraphicNovel extends React.Component<
  {},
  GraphicNovelState
> {
  constructor(props) {
    super(props)
    this.state = { currentImage: 0, lightboxIsOpen: false }
    this.closeLightbox = this.closeLightbox.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    })
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    })
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    })
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    })
  }
  render() {
    const galleryStyle = css`
      width: 1126px;
    `
    const flexStyle = css`
      display: flex;
      justify-content: center;
    `
    return (
      <div className={flexStyle}>
        <div className={galleryStyle}>
          <Gallery photos={photos} columns={2} onClick={this.openLightbox} />
          <Lightbox
            images={photos}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
            showImageCount={false}
          />
        </div>
      </div>
    )
  }
}
