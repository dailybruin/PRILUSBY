import * as React from 'react'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'
import {
  Article,
  CoverPhoto,
  Head,
  XPosition,
  YPosition,
} from '@dailybruin/lux'
import CustomHeader from '../components/CustomHeader'
import { Footer } from '../components/Footer'

import Alexphoto from '../images/alexphoto.png'
import Juliettephoto from '../images/juliettephoto.png'
import Meganphoto from '../images/meganphoto.png'

import Alexsig from '../images/alex.png'
import Juliettesig from '../images/juju.png'
import Megansig from '../images/mle.png'

interface AboutInfo {
  headshot?: string
  title?: string
  name: string
  text?: string
  signature?: string
  email?: string
}

export function AboutFrame(props: AboutInfo) {
  if (typeof document == 'undefined') {
    return null
  }
  return (
    <div
      className={css`
        text-align: center;
        font-family: Barlow;
        font-style: normal;
        flex: 1;
        line-height: normal;
      `}
    >
      <img
        className={css`
          margin-bottom: 16px;
        `}
        src={props.headshot}
      />
      <div
        className={css`
          font-weight: 600;
          font-size: 30px;
        `}
      >
        {props.title}
      </div>
      <div
        id="name"
        className={css`
          margin: 11px;
          font-weight: 500;
          font-size: 24px;
        `}
      >
        {props.name}
      </div>
      <div
        id="description"
        className={css`
          font-weight: 500;
          font-size: 18px;
          margin: 0 20px 0 20px;
        `}
      >
        {props.text}
      </div>
      <img
        className={css`
          margin: 22px;
          height: 5em;
        `}
        src={props.signature}
      />
      <div
        id="email"
        className={css`
          font-weight: 500;
          font-size: 18px;
          margin-bottom: 50px;
        `}
      >
        {props.email}
      </div>
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
  }
`
const About = ({ data }) => (
  <>
    <CustomHeader transparent={false} />
    <div
      className={css`
        text-align: center;
        font-family: Barlow;
        font-weight: 800;
        line-height: normal;
        font-size: 36px;
        color: black;
        margin-top: 107px;
      `}
    >
      mission
    </div>
    <div
      className={css`
        font-family: Barlow;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        font-size: 24px;
        text-align: center;
        margin: 18px 12vw 108px 12vw;
      `}
    >
      <p>
        In this Winter 2019 issue, we hope to strike a chord on the subject of
        identity. We’re all on a mission to better understand ourselves within
        the context of our communities as we forge a sense of who we are and,
        more importantly, who we might become.
      </p>
      <p>
        Some of us search for ourselves in our memories of the past, which we
        may uncover in places as unexpected as our online shopping carts to
        keepsakes as familiar as the recipes of our childhoods. From quotidian
        commutes through Berlin to half-packed games at Pauley Pavilion during
        peak sports season, the adventures and places contributors have
        investigated enlighten our search for a Bruin identity in relation to
        the sprawling places that surround us. We also featured the voices of
        those who are often overlooked, if not silenced, by the UCLA community,
        from the driven nonstudents who tread Bruin Walk to those who seek
        recovery from personal struggles.
      </p>
      <p>
        Our habits and all we hold dear can also play a role in how we seek
        change over the years, as one writer examined the psychological toll of
        being the lifelong fan of a controversial figure. But even when the
        things we cherish most are lost to forces beyond our control, we find
        ways to move forward and live for ourselves. In the end, we pen our own
        narratives, and the most beautiful stories are often considerate of
        those others write alongside us.
      </p>
    </div>
    <div
      className={css`
        text-align: center;
        font-family: Barlow;
        font-weight: 800;
        line-height: normal;
        font-size: 36px;
        color: black;
        margin-top: 107px;
        margin-bottom: 25px;
      `}
    >
      staff
    </div>
    <div
      className={css`
        display: flex;
        justify-content: space-evenly;
        margin: 0 10vw 0 10vw;
        @media (max-width: 1000px) {
          display: block;
        }
      `}
    >
      <AboutFrame
        headshot={Meganphoto}
        title={'PRIME art director'}
        name={'Megan Le'}
        text={
          'Le is a fourth-year anthropology major and film and tv minor. She was previously the Design director of the Daily Bruin.'
        }
        signature={Megansig}
        email={'mle@dailybruin.com'}
      />
      <AboutFrame
        headshot={Juliettephoto}
        title={'PRIME director'}
        name={'Juliette Le Saint'}
        text={
          'Le Saint is a third-year cognitive science major. She was previously the Illustrations director for the Daily Bruin.'
        }
        signature={Juliettesig}
        email={'jsaint@dailybruin.com'}
      />
      <AboutFrame
        headshot={Alexphoto}
        title={'PRIME content director'}
        name={'Alex Del Rosario'}
        text={
          'Del Rosario is a fourth-year comparative literature student with a minor in French. She was previously an A&E staff reporter.'
        }
        signature={Alexsig}
        email={'adelrosario@dailybruin.com'}
      />
    </div>
    <Footer />
  </>
)

export default About
