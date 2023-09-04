import * as React from 'react'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'
import CustomHead from '../components/CustomHead'
import CustomHeader from '../components/CustomHeader'
import { Footer } from '../components/Footer'

import AbiPhoto from '../images/AbiSiatkowskiPhoto.jpg'
import MeganTagamiPhoto from '../images/MeganTagamiPhoto.jpg'
import MeganFuPhoto from '../images/MeganFuPhoto.jpg'

import AbiSig from '../images/AbiSig.png'
import MeganTagamiSig from '../images/MeganTagamiSig.png'
import MeganFuSig from '../images/MeganFuSig.png'

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
          description="PRIME is the official website for the Daily Bruin's quarterly arts, culture and lifestyle magazine."
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
        description="PRIME is the official website for the Daily Bruin's quarterly arts, culture and lifestyle magazine."
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
        narratives that might otherwise be overlooked at a big, ever-buzzing
        institution like UCLA.
      </p>

      <p>
        When lecturers protested against unfair labor practices, PRIME covered
        the daily struggles they endure as faculty. We also reported on the
        evolution of COVID-19 testing technology as our community returned to
        campus. PRIME investigates the questions that matter most, from
        transgender inclusion in student life to the ethics of animal
        experimentation.
      </p>

      <p>
        PRIME writers delve into every element of the Bruin experience. Even
        while investigating predatory landlords in Westwood, we make time for
        exploring the history of Bruins' love for boba. Personal columns also
        have a home in PRIME. From discussing the imposter syndrome of being a
        nontraditional student to reflecting on identity as a child of
        immigrants, PRIME platforms reporters to honestly share their diverse
        stories.
      </p>

      <p>
        Our quarterly magazine exists at the intersection of reporting, writing,
        design and art and is made possible by the Daily Bruin staff and our
        very own PRIME reporters. As PRIME pushes the boundaries of narrative
        journalism, embracing multimedia formats and immersive first-person
        reporting, we will continue to tell the stories that need to be told.
      </p>

      <p>Thank you for reading PRIME. We hope you enjoy it.</p>

      <p>With love,</p>

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
        headshot={AbiPhoto}
        title={'PRIME director'}
        name={'Abigail Siatkowski'}
        text={
          'Siatkowski is the 2022-2023 PRIME director. She was previously the 2021-2022 PRIME content editor and a contributor for the Arts, News, Sports and Outreach sections. She is also a third-year communication student at UCLA.'
        }
        signature={AbiSig}
        email={'asiatkowski@dailybruin.com'}
      />
      <AboutFrame
        headshot={MeganTagamiPhoto}
        title={'PRIME content editor'}
        name={'Megan Tagami'}
        text={
          'Tagami is the 2022-2023 PRIME content editor. She was previously a News and PRIME staff member. She is a political science and public affairs student from Honolulu.'
        }
        signature={MeganTagamiSig}
        email={'mtagami@dailybruin.com'}
      />
      <AboutFrame
        headshot={MeganFuPhoto}
        title={'PRIME art director'}
        name={'Megan Fu'}
        text={
          'Fu is the 2022-2023 PRIME art director. Previously, she was a PRIME staff writer and a contributor for Arts and Illustrations. She is also a fourth-year English student minoring in linguistics and cognitive science.'
        }
        signature={MeganFuSig}
        email={'mfu2@dailybruin.com'}
      />
    </div>
    <Footer />
  </>
)

export default About
