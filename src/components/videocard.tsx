import { Component, ReactNode } from 'react'
import ReactPlayer from 'react-player'

interface VideoProps {
  video: string
}

interface VideoState {
  width: number
  height: number
}

export default class VideoCard extends Component<VideoProps, VideoState> {
  constructor(props: VideoProps) {
    super(props);
    this.state = {
      width: 1020,
      height: 720
    }
  }


  render(): ReactNode {
    console.log(this.props.video.split('/'));
    console.log(this.props.video);
    if (this.props.video.split('/')[1] == 'Users') {
      return (
          <>
            <div className='card'>
              <ReactPlayer 
                className='react-player fixed-bottom'
                width={this.state.width} height={this.state.height}
                src={this.props.video}
                controls = {true}
              />
            </div>
          </>
          )
    } else {
      return (
        <>
          <div className='card'>
            <iframe width={this.state.width} height={this.state.height} src={this.props.video}>
            </iframe>
          </div>
        </>
      )
    }
  }
}


