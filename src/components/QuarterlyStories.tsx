import React from 'react'
import { css, cx } from 'emotion'
import Swiper from 'react-id-swiper'

interface QuarterlyStoriesProps {
  quarters: {
    quarter: String,
    stories: {
      title: string,
      description: string,
      imageURL: string,
    }[],
  }[]
}

export class QuarterlyStories extends React.Component<QuarterlyStoriesProps> {

  render() {
    const params = {
      slidesPerView: 3,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    }

    return (
      
      <div>
        {this.props.quarters.map((quarter) =>
          <div className={css`
            position: relative;
          `}
          >
            <p className={css`
              font-family: Barlow;
              font-style: italic;
              font-weight: 500;
              line-height: normal;
              font-size: 48px;
              margin: 0;
            `}><b>{quarter.quarter}</b></p>
            <Swiper {...params}>
              {quarter.stories.map((story) =>
                <div>
                  <div className={css`
                    text-align: center;
                    color: white;
                    background-size: auto 100%;
                    background-position: center;
                    background-image: url(${ story.imageURL });
                  `}
                  >
                    <div className={css`
                      height: 50vh;
                      position: relative;
                    `}>
                      <div className={css`
                        position: absolute;
                        bottom: 0;
                        left: 5%;
                        width: 80%;
                      `}>
                        <div className={css`
                          background-color: white;
                          color: black;
                          padding: 20px;
                          position: relative;
                          width: 100%;
                          bottom: 0;
                          left: 0;
                          text-align: left;

                          font-family: Barlow;
                          font-style: italic;
                          font-weight: 500;
                          line-height: normal;
                          font-size: 18px;
                        `}>
                          <div className={css`
                            background-color: black;
                            color: white;
                            padding: 20px;
                            position: absolute;
                            
                            top: -35px;
                            left: -35px;
                            z-index: 100;
                            width: auto;
                            padding: 12px;
                            float: left;

                            font-family: Barlow;
                            font-style: normal;
                            font-weight: 800;
                            line-height: normal;
                            font-size: 24px;
                          `}>
                            { story.title }
                          </div>
                          { story.description }
                        </div>                  
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Swiper>
            <div className={css`
              height: 5px; 
              width: 100vw;
              background-color: black; 
              margin: 20px;`
            }/>
          </div>
        )}
      </div>
    )
  }
}