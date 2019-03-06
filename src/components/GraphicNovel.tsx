import React from 'react'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'
import { css } from 'react-emotion'

interface GraphicNovelProps {
  content: any[]
}
interface GraphicNovelState {
  currentImage: number
  lightboxIsOpen: boolean
}
export default class GraphicNovel extends React.Component<
  GraphicNovelProps,
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

  photos = this.props.content.map(photo => {
    console.log(photo)
    return {
      src: JSON.parse(photo.value).url,
      width: 5,
      height: 7,
    }
  })
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
          <Gallery
            photos={this.photos}
            columns={2}
            onClick={this.openLightbox}
          />
          <Lightbox
            images={this.photos}
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
