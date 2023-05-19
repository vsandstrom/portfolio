import {Component, ReactNode} from 'react'

interface AudioProps {
  src: string | null,
  desc: string | null,
}

class AudioCard extends Component<AudioProps> {

  constructor(props: AudioProps) {
    super(props);
  }

  render(): ReactNode {
    if (this.props.src != null) {
      const suffix = this.props.src.split('.').at(-1);
      const desc = this.props.desc != null ? this.props.desc : '';

      if (suffix == 'wav' || suffix == 'WAV' || suffix == 'wave') {
        return (
          <audio controls title={desc} controlsList='nodownload' preload='none'>
            <source  src={this.props.src} type="audio/wav"/>
          </audio>
        )

      } else if (suffix == 'mp3' || suffix == 'MP3' || suffix == 'mpeg') {
        return (
          <audio controls className='audioplayer' title={desc} controlsList='nodownload' preload='none'>
            <source src={this.props.src} type="audio/mpeg"/>
          </audio>
        ) 
      } 
    }
  }
}
export default AudioCard;
