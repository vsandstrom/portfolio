import { Component, ReactNode } from 'react'
import ReactPlayer from 'react-player'

interface CardProps {
  video: string,
  parentSize: number
}

interface CardStates {
  width: number
  height: number
}

class Card extends Component<CardProps, CardStates> {
  constructor(props: CardProps) {
    super(props);

    this.state = {
      width: this.props.parentSize * 0.585, 
      height: this.props.parentSize * 0.33
    }
  }

  setWindowWidth = () => {
    this.setState({
      width: this.props.parentSize * 0.585,
      height: this.props.parentSize * 0.33
    })
  }

  componentDidMount(): void {
    window.addEventListener('resize', this.setWindowWidth);
  }

  componentWillUnmountMount(): void {
    window.removeEventListener('resize', this.setWindowWidth);
  }

  render(): ReactNode {
    console.log(this.props.video.split('/'));
    console.log(this.props.video);
    if (this.props.video.split('/')[1] == 'Users') {
      return (
        <ReactPlayer 
        className='react-player fixed-bottom'
        width={this.state.width} height={this.state.height}
        src={this.props.video}
        controls = {true}
        />
      )
    } else {
      return (
        <iframe width={this.state.width} height={this.state.height} src={this.props.video}>
        </iframe>
      )
    }
  }
}

export default Card;
