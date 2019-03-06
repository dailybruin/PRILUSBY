import * as React from 'react'
import { css } from 'react-emotion'

export class ArticleGrid extends React.Component {
  render() {
    const gridStyle = css`
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    `
    const gridStyles1 = css`
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 16px;
      @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 700px) {
        grid-template-columns: 1fr;
      }
    `
    return <div className={gridStyles1}>{this.props.children}</div>
  }
}
