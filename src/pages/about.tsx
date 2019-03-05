import * as React from 'react'
import { graphql } from 'gatsby'

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
const About = ({ data }) => <div>hello</div>

export default About
