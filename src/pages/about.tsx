import * as React from 'react'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'
import CustomHead from '../components/CustomHead'
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
    return (
      <>
        <CustomHead
          siteName="PRIME"
          pageName="about"
          url="https://prime.dailybruin.com/about"
          description="PRIME is the official website for the Daily Bruin's quarterly arts, culture, and lifestyle magazine."
          image="http://assets.dailybruin.com/images/prime.map.articles.to.issues/prime%20cover%20spring.jpg"
        />
      </>
    )
  }
  return (
    <>
      <CustomHead
        siteName="PRIME"
        pageName="about"
        url="https://prime.dailybruin.com/about"
        description="PRIME is the official website for the Daily Bruin's quarterly arts, culture, and lifestyle magazine."
        image="http://assets.dailybruin.com/images/prime.map.articles.to.issues/prime%20cover%20spring.jpg"
      />
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
    </>
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
        text-align: left;
        margin: 18px 12vw 108px 12vw;
      `}
    >
      <p>Dear reader,</p>
      <p>
        If there’s one thing many of us will learn in college, it’s that meshing
        with the places, people and pursuits that make us feel like we’re home
        can be quite a challenge. But what does it take to belong?
      </p>
      <p>
        Kennedy Hill, a self-proclaimed “blerd” – a black nerd – and lifelong
        fan of anime, found the confidence to cosplay by speaking with other
        trailblazing female blerds. She confronts a persisting feeling of
        exclusion from the anime community head on. Similarly, Molly Wright
        addresses her unintentional withdrawal from friends and family
        post-breakup.
      </p>
      <p>
        Some take a more self-reflective approach. In his graphic novel, Marvel
        fan Cody Wilson illustrates how he came to terms with his introverted
        nature following the passing of his heroes. Kristin Snyder brings to
        light how individual study, music and friendship, gave some LGBTQ
        students the will to reconcile disparate identities within the Christian
        community. And in her column, Anushka Jain tells us the story of her
        growing up, laying bare the nature of her grief after losing her mother.
      </p>
      <p>
        Abby Thomas uncovers the individuated paths the seemingly uniform cadets
        of ROTC walk on in their search for purpose. Writer Joy Harjanto shows
        we are capable of more than we think, speaking with students once
        dismissed from UCLA who, once convinced they didn’t belong on campus,
        made their way back.
      </p>
      <p>
        This quarter, PRIME shows us belonging isn’t contingent on comfort.
        Rather, it’s an active process those featured in this final edition
        prove is well-worth the time and effort.
      </p>
      <p>
        Thank you for picking up this last issue of PRIME, we hope you enjoy it.
      </p>
      <p>Peace out,</p>
      <p>The PRIME editors</p>
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
