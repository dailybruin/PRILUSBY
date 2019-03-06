import * as React from 'react'
import { css } from 'emotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

class MobilePopup extends React.Component<any, any> {
  public detailsRef: React.RefObject<HTMLInputElement> = React.createRef()

  public state = {
    open: false,
  }

  public componentDidMount() {
    document.addEventListener('mousedown', this.handleClick)
  }

  public componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick)
  }

  public handleClick = (event: MouseEvent) => {
    if (
      this.detailsRef.current &&
      !this.detailsRef.current.contains(event.target as Node)
    ) {
      this.detailsRef.current.removeAttribute('open')
    } else {
      this.setState({ open: !this.state.open })
    }
  }

  public render() {
    return (
      <details
        ref={this.detailsRef}
        className={css`
          position: absolute;
          top: 3vw;
          justify-self: end;
          text-align: left;
          margin-right: 55px;
          @media (min-width: 940px) {
            display: none;
          }
        `}
      >
        <summary
          className={css`
            position: relative;
            display: block;
            font-size: 1rem;
            width: 20vw;
            height: 20vw;
            text-align: center;
            ::-webkit-details-marker {
              display: none;
            }
          `}
          style={this.state.open ? {
            backgroundColor: "white",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
          } : null}
        >
          {this.state.open ?
            <FontAwesomeIcon
              className={[css`
                color: black;
                padding: 6vw;
              `, 'fa-lg'].join(' ')}
              icon={faBars}
            /> :
            <FontAwesomeIcon
              className={[css`
                color: white;
                padding: 6vw;
              `, 'fa-lg'].join(' ')}
              icon={faBars}
            />
          }
        </summary>
        <nav
          className={css`
            position: relative;
            display: grid;
            grid-template-columns: 1fr;
            font-family: barlow;
            font-size: 24px;
            font-weight: 800;
            max-width: 20vw;
            a {
              text-decoration: none;
              color: black;
              font-size: 0.85rem;
              margin: 0.5rem 0.6rem 0.5rem auto;
              text-align: right;
            }
            background-color: white;
            color: black !important;
            border-bottom-left-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          `}
        >
          {this.props.children}
        </nav>
      </details>
    )
  }
}

export default MobilePopup
