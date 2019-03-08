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
    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', this.handleClick)
    }
  }

  public componentWillUnmount() {
    if (typeof document !== 'undefined') {
      document.removeEventListener('mousedown', this.handleClick)
    }
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
          @media (min-width: 940px) {
            display: none;
          }
        `}
      >
        <summary
          className={css`
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            width: 70px;
            height: 70px;
            text-align: center;
            ::-webkit-details-marker {
              display: none;
            }
          `}
          style={
            this.state.open
              ? {
                  backgroundColor: 'white',
                  borderTopLeftRadius: '0.5rem',
                  borderTopRightRadius: '0.5rem',
                }
              : null
          }
        >
          {this.state.open ? (
            <FontAwesomeIcon
              className={[
                css`
                  color: black;
                `,
                'fa-lg',
              ].join(' ')}
              icon={faBars}
            />
          ) : (
            <FontAwesomeIcon
              className={[
                css`
                  color: white;
                `,
                'fa-lg',
              ].join(' ')}
              icon={faBars}
            />
          )}
        </summary>
        <nav
          className={css`
            position: relative;
            display: grid;
            grid-template-columns: 1fr;
            font-family: barlow;
            font-size: 20px;
            font-weight: 800;
            max-width: 70px;
            a {
              text-decoration: none;
              color: black;
              font-size: 0.9rem;
              word-break: keep-all;
              width: 60px;
              margin: 0.8rem 0.6rem 0.8rem auto;
              word-spacing: 100%;
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
