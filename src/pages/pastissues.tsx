import * as React from 'react'
import { graphql } from 'gatsby'
import { css } from 'emotion';
import CustomHeader from '../components/CustomHeader';
import { Footer } from '../components/Footer';
import { CoverGallery } from '../components/CoverGallery';

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
    <div
      className={css`
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <CustomHeader/>
      <CoverGallery
        photos={data.issues.issues}
      />
      <Footer/>
    </div>
  )
};
