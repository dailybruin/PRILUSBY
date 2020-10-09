import * as React from 'react'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'
import CustomHead from '../components/CustomHead'
import CustomHeader from '../components/CustomHeader'
import { Footer } from '../components/Footer'

import AnushkaPhoto from '../images/anushka_photo.png'
import JustinPhoto from '../images/justin_photo.jpg'
import SamPhoto from '../images/sam_photo.jpg'

import AnushkaSig from '../images/anushka_signature.png'
import JustinSig from '../images/justin_signature.png'
import SamSig from '../images/sam_signature.png'

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
          image="https://assets.dailybruin.com/images/sabrina.whensoundshurt/cover-83530e07fd73cf3d7e1c8b5a85639df2.jpg"
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
        image="https://assets.dailybruin.com/images/sabrina.whensoundshurt/cover-83530e07fd73cf3d7e1c8b5a85639df2.jpg"
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
            width: 300px;
            height: 300px;
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
        Here at PRIME, we strive to shine a light on issues affecting the UCLA
        community and give them a human voice. As a magazine, we aim to uplift
        narratives that might otherwise be overlooked at a big, ever buzzing
        institution like the Daily Bruin.
      </p>
      <p>
        When AFSCME protests rocked campus, PRIME told the story of a leader at
        the union, shedding light on his experiences as a senior custodian and
        single father. Illustrations of the human heart and skull helped tell
        the shocking story of body parts stolen from the UCLA Willed Body
        Program. And when the pandemic altered academic life, at PRIME we hoped
        to share the new grim reality for graduating UCLA medical students.
      </p>
      <p>
        Personal columns also have a home in PRIME. One of our reporters has
        written about her experience grappling with imposter syndrome as a Black
        Bruin, and another has discussed her experiences with misophonia – a
        disorder which causes an aversion to “triggering” sounds like chewing.
      </p>
      <p>
        Our quarterly magazine exists at the intersection of reporting, writing,
        design and art, and is made possible by the Daily Bruin staff and our
        very own PRIME reporters.
      </p>
      <p>
        As UCLA students navigate the highs and lows of this virtual school
        year, PRIME will be here, continuing to tell important stories that need
        to be told.
      </p>
      <p>Thank you for reading PRIME, we hope you enjoy it.</p>
      <p>With love,</p>
      <p>The PRIME Editors</p>
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
        headshot={SamPhoto}
        title={'PRIME art director'}
        name={'Samantha Joseph'}
        text={
          'Joseph is a fourth-year microbiology major. She was previously an assistant Design director of the Daily Bruin.'
        }
        signature={SamSig}
        email={'sjoseph@dailybruin.com'}
      />
      <AboutFrame
        headshot={AnushkaPhoto}
        title={'PRIME director'}
        name={'Anushka Jain'}
        text={
          'Jain is a fourth-year neuroscience major and society and genetics minor. She was previously the PRIME content editor and an Arts & Entertainment assistant editor for the Lifestyle beat.'
        }
        signature={AnushkaSig}
        email={'ajain@dailybruin.com'}
      />
      <AboutFrame
        headshot={JustinPhoto}
        title={'PRIME content director'}
        name={'Justin Huwe'}
        text={
          'Huwe is a second-year English major. He was previously part of PRIME’s first class of interns.'
        }
        signature={JustinSig}
        email={'jhuwe@dailybruin.com'}
      />
    </div>
    <Footer />
  </>
)

export default About
