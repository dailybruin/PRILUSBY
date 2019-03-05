import * as React from 'react'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'
import {
  Article,
  CoverPhoto,
  Head,
  Footer,
  XPosition,
  YPosition,
} from '@dailybruin/lux'
import Juju from '../images/juju.png'
import DefaultSignature from '../images/juliette.png'

interface AboutInfo {
  headshot?: string
  title?: string
  name: string
  text?: string
  signature?: string
  email?: string
}

export function AboutFrame(props: AboutInfo) {
  return (
    <div className={css`
                    text-align: center;
                    font-family: Barlow;
                    font-style: normal;
                    flex: 1;
                    line-height: normal;`
    }>
    <img className={css`margin-bottom: 16px`} src={props.headshot}/>
    <div className={css`font-weight: 600;
                        font-size: 30px;`}
    dangerouslySetInnerHTML={{
    __html: props.title,
    }}/>
    <div id='name' className={css`margin: 11px; font-weight: 500; font-size: 24px;`}
    dangerouslySetInnerHTML={{
    __html: props.name,
    }}/>
    <div id='description'
    className={css`font-weight:500; font-size:18px; margin: 0 20px 0 20px;`}
    dangerouslySetInnerHTML={{
    __html: props.text,
    }}/>
    <img className={css`margin: 22px`} src={props.signature}/>
    <div id='email'
    className={css`font-weight:500; font-size:18px; margin-bottom: 50px;`}
    dangerouslySetInnerHTML={{
    __html: props.email,
    }}/>
    </div>

  )

}


export const query = graphql`
  query {
    site {
      siteMetadata {
        siteName
        description
        url
        image
      }
    }
    kerckhoffArticle {
      headline
      author
      content {
        type
        value
      }
    }
  }
`
const IndexPage = ({ data }) => (
  <>
  <div className={css`
                  text-align: center;
                  font-family: Barlow;
                  font-weight: 800;
                  line-height: normal;
                  font-size: 36px;
                  color: black;
                  margin-top: 107px`}>
  mission
  </div>
  <div className={css`
  font-family: Barlow;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 24px;
  text-align: center;
  margin: 18px 166px 108px 166px`}>
  PRIME IS THE BEST and you KNOW it. Let’s hear it for the preditors yawyeeeeet! It’s no longer prime because we’re BIGGER and BOLDER than ever before.
  </div>
  <div className={css`
                  text-align: center;
                  font-family: Barlow;
                  font-weight: 800;
                  line-height: normal;
                  font-size: 36px;
                  color: black;
                  margin-top: 107px;
                  margin-bottom: 25px;`}>
  staff
  </div>
  <div className={css`
                  display: flex;
                  justify-content: space-evenly;
                  margin: 0 10vw 0 10vw;
                  @media (max-width: 1000px) {
                    display: block;
                  }
                  `}>
    <AboutFrame
      headshot={Juju}
      title={'PRIME art director'}
      name={'Megan Le'}
      text={'She is a fourth-year anthropology major and film and tv minor. Le was previously the Design director of the Daily BruinShe is a fourth-year anthropology major and film and tv minor. Le was previously the Design director of the Daily Bruin'}
      signature={DefaultSignature}
      email={'mle@dailybruin.com'}/>
    <AboutFrame
      headshot={Juju}
      title={'PRIME art director'}
      name={'Megan Le'}
      text={'She is a fourth-year anthropology major and film and tv minor. Le was previously the Design director of the Daily Bruin'}
      signature={DefaultSignature}
      email={'mle@dailybruin.com'}/>
    <AboutFrame
      headshot={Juju}
      title={'PRIME art director'}
      name={'Megan Le'}
      text={'She is a fourth-year anthropology major and film and tv minor. Le was previously the Design director of the Daily Bruin'}
      signature={DefaultSignature}
      email={'mle@dailybruin.com'}/>
  </div>
  </>
)

export default IndexPage
