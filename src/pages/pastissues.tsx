import * as React from 'react'
import { graphql } from 'gatsby'
import { css } from 'emotion'
import CustomHead from '../components/CustomHead'
import CustomHeader from '../components/CustomHeader'
import { Footer } from '../components/Footer'
import { CoverGallery } from '../components/CoverGallery'

export const query = graphql`
  query {
    issues {
      issues {
        term
        coverphoto
      }
    }
  }
`

export default ({ data }) => {
  return (
    <>
      <CustomHead
        siteName="PRIME"
        pageName="past issues"
        url="https://prime.dailybruin.com/pastissues"
        description="PRIME is the official website for the Daily Bruin's quarterly arts, culture, and lifestyle magazine."
        image="https://assets.dailybruin.com/images/sabrina.whensoundshurt/cover-83530e07fd73cf3d7e1c8b5a85639df2.jpg"
      />
      <div
        className={css`
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <CustomHeader />
        <CoverGallery photos={data.issues.issues} />
        <Footer />
      </div>
    </>
  )
}