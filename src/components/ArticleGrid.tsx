import * as React from 'react'
import { css } from 'react-emotion'

export class ArticleGrid extends React.Component {
  render() {
    const gridStyle = css`
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    `
    return <div className={gridStyle}>{this.props.children}</div>
  }
}
