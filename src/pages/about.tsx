import * as React from 'react'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'
import CustomHead from '../components/CustomHead'
import CustomHeader from '../components/CustomHeader'
import { Footer } from '../components/Footer'

import { useEffect, useState } from 'react'

interface AboutInfo {
  headshot?: string
  title?: string
  name: string
  text?: string
  signature?: string
  email?: string
}

interface AboutData {
  pageName: string;
  url: string;
  description: string;
  image: string;
  missionStatement: { type: string; content: string }[];
  directors: {
    title: string;
    name: string;
    bio: string;
    email: string;
    signature: string;
    headshot: string;
  }[];
}

export function AboutFrame(props) {
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://kerckhoff.dailybruin.com/api/packages/prime/prime.about")
      .then(res => res.json())
      .then(res => setData(res.data['article.aml'] as AboutData)) // Type assertion
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Log the fetched data to debug
  console.log(data);

  // Check if the document is undefined (i.e., during server-side rendering)
  if (typeof document === 'undefined') {
    // Render only if data is available during SSR
    return data ? (
      <>
        <CustomHead
          siteName={data.pageName || 'PRIME'}
          pageName={data.pageName || 'about'}
          url={data.url || 'https://prime.dailybruin.com/about'}
          description={
            data.description ||
            "PRIME is the official website for the Daily Bruin's quarterly arts, culture and lifestyle magazine."
          }
          image={
            data.image ||
            'https://assets.dailybruin.com/images/sabrina.whensoundshurt/cover-83530e07fd73cf3d7e1c8b5a85639df2.jpg'
          }
        />
      </>
    ) : null; // Render nothing if data is not yet available during SSR
  }

  // Render the component for client-side with dynamic data
  return (
    <>
      {data ? (
        <CustomHead
          siteName={data.pageName}
          pageName={data.pageName}
          url={data.url}
          description={data.description}
          image={data.image}
        />
      ) : (
        // Loading state while fetching the data
        <CustomHead
          siteName="PRIME"
          pageName="about"
          url="https://prime.dailybruin.com/about"
          description="PRIME is the official website for the Daily Bruin's quarterly arts, culture and lifestyle magazine."
          image="https://assets.dailybruin.com/images/sabrina.whensoundshurt/cover-83530e07fd73cf3d7e1c8b5a85639df2.jpg"
        />
      )}
      <div
        className={css`
          text-align: center;
          font-family: Barlow;
          font-style: normal;
          flex: 1;
          line-height: normal;
        `}
      >
        {/* Update image styling to preserve aspect ratio */}
        <img
          className={css`
            margin-bottom: 16px;
            width: 300px; /* Fixed width for uniform size */
            height: 300px; /* Fixed height for uniform size */
            object-fit: cover; /* Ensures image covers the area and maintains aspect ratio */
            object-position: center; /* Centers the cropped image */
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
            object-fit: cover; /* Ensures image covers the area and maintains aspect ratio */
            object-position: center; /* Centers the cropped image */
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
const About = () => {
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://kerckhoff.dailybruin.com/api/packages/prime/prime.about")
      .then(res => res.json())
      .then(res => setData(res.data['article.aml'] as AboutData)) // Type assertion
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
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
        {data.missionStatement.map((paragraph, index) => (
          <p key={index}>{paragraph.content}</p>
        ))}
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
        {data.directors.map((director, index) => (
          <AboutFrame
            key={index}
            headshot={director.headshot}
            title={director.title}
            name={director.name}
            text={director.bio}
            signature={director.signature}
            email={director.email}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default About;
