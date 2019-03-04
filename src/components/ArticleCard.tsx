import * as React from "react";
import { Link } from "gatsby";
import { css } from "react-emotion";

interface ArticleCardProps {
  blackCardFontSize: number;
  whiteCardFontSize: number;
  blackCardText: string;
  whiteCardText: string;
  imageSrc: string;
  href: string;

  cardTranslation?: string;
  wrapperWidthVW: number;
  imgWidthVW: number;
}

export class ArticleCard extends React.Component<ArticleCardProps> {
  render() {
    return (
      <Link to={this.props.href}
        className={css`
          position: relative;
          width: ${this.props.wrapperWidthVW}vw;
          &:link, &:hover, &:active {
            text-decoration: none;
          }
        `}>
        <img
          className={css`
            display: block;
            margin: auto;
            width: ${this.props.imgWidthVW}vw;
            z-index: 0;
          `}
          src={this.props.imageSrc}
          alt=""/>
        <div className={css`
          margin-top: -3rem;
        `}>
          <div className={css`
            position: relative;
            z-index: 2;
            display: inline-block;
            font-family: Arial;
            font-weight: bold;
            font-size: ${this.props.blackCardFontSize}rem;
            color: white;
            background-color: black;
            padding: 0.5rem 1rem;
            text-decoration: none;
          `}>{this.props.blackCardText}</div>
          <div className={css`
            z-index: 0;
            margin-top: -${this.props.whiteCardFontSize * 0.5}rem;
            display: inline-block;
            max-width: 80%;
            font-size: ${this.props.whiteCardFontSize}rem;
            font-style: italic;
            background-color: white;
            color: black;
            font-family: Arial;
            text-decoration: none;
            margin-left: 10%;
            padding: ${this.props.whiteCardFontSize}rem;
          `}>{this.props.whiteCardText}</div>
        </div>
      </Link>
    )
  }
}