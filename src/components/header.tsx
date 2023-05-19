import { Component, ReactNode } from "react";
import { Link } from 'react-router-dom';

import github from '../assets/github.png';
import soundcloud from '../assets/soundcloud.png';
import bandcamp from '../assets/bandcamp.png';

interface HeaderState {
  name: string[],
  width: number,
  height: number,
}

export default class Header extends Component<Record<string, never>, HeaderState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      name: ["V", "I", "K", "T", "O", "R", " ", "S", "A", "N", "D", "S", "T", "R", "Ö", "M"], 
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  
  setWindowWidth = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }
  
  componentDidMount(): void {
    window.addEventListener('resize', this.setWindowWidth);
  }

  componentWillUnmountMount(): void {
    window.removeEventListener('resize', this.setWindowWidth);
  }

  renderName = (): JSX.Element[] => {
    return this.state.name.map((char, i) => 
      <>
        <div id={"name" + i} key={i}>
          {char}
        </div>
      </>
    )
  }

  renderLinks = () => {
    return (
      <>
        <a className="sublinks" key={0} href="https://viktorsandstrm.bandcamp.com" target="_blank" rel="noreferrer">
          {this.state.width > 900 && <img className="logo bc" src={bandcamp} alt="bandcamp logo" ></img>}
          {this.state.width > 1200 && <p> BandCamp </p>}
        </a>
        <a className="sublinks" key={1} href="https://soundcloud.com/viktorsandstrm" target="_blank" rel="noreferrer">
          {this.state.width > 900 &&<img className="logo sc" src={soundcloud} alt="soundcloud logo"></img>}
          {this.state.width > 1200 && <p> SoundCloud </p>}
          
        </a>
        <a className="sublinks" key={2} href="https://github.com/vsandstrom" target="_blank" rel="noreferrer">
          {this.state.width > 900 &&<img className="logo gh" src={github} alt="github logo"></img>}
          {this.state.width > 1200 && <p> GitHub </p>}
          
        </a>
      </>
    )
  }

  renderSubHeader = (): JSX.Element => {
    return (
      <>
      <div className='subHeader' key={"home"}>
          <Link to="/" rel='noopener noreferrer'>
            <h3>HOME</h3>
          </Link>
        </div>
        <div className='subHeader' key={"portfolio"}>
          <Link to="/portfolio"rel='noopener noreferrer'> 
            <h3>PORTFOLIO</h3>
          </Link>
        </div>
        <div className='subHeader' key={"contact"}>
          <Link to='/contact' rel='noopener noreferrer'>
            <h3>CONTACT</h3>
          </Link>
        </div>
        {window.innerWidth <= 768 &&
          <div className='subHeader' key={"gyro"}>
            <Link to='/gyro' rel='noopener noreferrer'>
              <h3>GYRO</h3>
            </Link>
          </div>
        }
      </>
    )

  }

  render(): ReactNode {
    return (
      <>
      <div id="nav">
        <div className="header">
          <div key={0}>
            <h1 className="name child">{this.renderName()}</h1>
          </div>
          <div className="links">
            {this.renderLinks()}
          </div>
        </div>
        <div className="header">
          <div className="subHeader">
            {this.renderSubHeader()}
          </div>
        </div>
      </div>
      </>
    )
  }
}
