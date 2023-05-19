import {Component, ReactNode} from 'react'
import Card from '../components/card'
import Header from '../components/header'
import AudioCard from '../components/audio'
import PortfolioHeader from '../components/portfolio_header'

// Imports url or relative paths, descriptions, and eventual other links from JSON
import video_registry from '../portfolio/video.json'
import audio_registry from '../portfolio/audio.json'
// renders local and non-local video similarly
// local videos has to be placed in 'public/' directory

interface VideoItem {
  title: string | null,
  desc: string | null, 
  links: string[] | null,
  url: string
}

interface LinkItem {
  name: string,
  url: string,
}

interface AudioItem {
  title: string | null,
  desc: string | null, 
  links: LinkItem[] | null,
  url: string | null,
}

interface Audio {
  album: string | null
  id: string,
  description: string | null,
  playlist: AudioItem[],
}

interface Items {
  title: string,
  category: string,
  works: Audio[],
}

interface PortfolioState {
  width: number,
  height: number
  audioData: Items[],
  videoData: VideoItem[],
  audioLinkIsOpen: boolean,
}

export default class Portfolio extends Component<Record<string,never>, PortfolioState> {
  constructor(props: Record<string,never>){
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      // @ts-expect-error doop
      audioData: audio_registry,
      videoData: video_registry,
      audioLinkIsOpen: false,
    }
  }

  setWindowWidth = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  componentDidMount(): void {
    window.addEventListener('resize', this.setWindowWidth);
    
    // Allows for only one audio element playing at once.
    const audios = document.getElementsByTagName('audio');
    for (const audio of audios) {
      audio.addEventListener('play', (e) => {
          for (const audio of audios) {
          if (!audio.paused && audio != e.currentTarget) {
            audio.pause();
            // Reset to start time
            audio.currentTime = 0;
          }
        }
      });
    }

    const infolinks = [...document.getElementsByClassName('audioLink')];
    infolinks.map((link) => {
      link.addEventListener('onhover', (e) => {
        console.log(e.currentTarget);
      });
    });

    window.addEventListener('resize', this.setWindowWidth);
  }

  componentWillUnmountMount(): void {
    window.removeEventListener('resize', this.setWindowWidth);
  }

  handleOpen = () => {
    const b = this.state.audioLinkIsOpen;
    this.setState({audioLinkIsOpen: !b});
  }

  renderVideo = () => {
    return this.state.videoData.map((obj) => 
      <>
        <div className="card" key={obj.title}>
          <p>{obj.desc}</p>
          {obj.links != null &&
            obj.links.map((link) => 
              <a href={link} key={link}>Intervju med Borås Tidning</a>
            )
          }
          <Card video={obj.url} parentSize={window.innerWidth}></Card>
        </div>
      </>
    )
  }

  renderLinks = (title: string | null, links: LinkItem[]) => { 
    const ls = links.map((link: LinkItem, i: number) => {
        return (
            <a href={ link.url } key={i} title={ link.name } target="_blank" rel='noopener noreferrer'>
            {link.name}
            </a>
      )
    });

    return ls;
  }

  renderAudio = (playlist: AudioItem[]) => {
    const arr = [];
      for (const audio of playlist) {
        arr.push(
        <div key={audio.title} className='item'>
          <div className='audioItem'>
            <div>
              <h4>{audio.title}</h4>
              {audio.desc != null &&
                <p id="description">{audio.desc}</p>
              }
              { audio.desc != null && audio.url != null  &&
                <AudioCard src={audio.url} desc={audio.desc}></AudioCard>
              }
              <div className='audioLink'>
              {audio.links != null && this.renderLinks(audio.title, audio.links)
              }
              </div>
            </div>
          </div>
        </div>
        )
      }
    return arr;
  }

  renderAlbums = (albums: Audio[]) => {
    const arr = [];
    for (const album of albums) {
      arr.push(
      <>
      <div key={album.album}>
        <div className='album'>
          <h4 className='albumtitle'>{album.album}</h4>
        </div>
        {album.description != null && 
        <div className='albumDescription'>
        <p>{album.description}</p>
        </div>
        }
        {this.renderAudio(album.playlist)}
      </div>
      </>
      )
    }
    return arr;

  }

  
  renderItems = () => {
    const arr = [];
    for (const category of this.state.audioData) {
      arr.push(
      <>
      <div className='card' id={category.category} key={category.category}>
        <div className='album'>
          <h4 className='categorytitle'>{category.title}</h4>
        </div>
        {this.renderAlbums(category.works)}
      </div>
      </>
      )
    }
    return arr;

  }

  render(): ReactNode {
    // const videos: JSX.Element[] = this.renderVideo();
    const audios: JSX.Element[] = this.renderItems();

    return (
      <>
      <header className='scrollHead'>
        {/* <Header/> */}
        <PortfolioHeader/>
      </header>
        <div className='portfolio'>
          <div className='audio'>
            {audios}
          </div>
          <iframe className='bandcamp' src= "https://bandcamp.com/EmbeddedPlayer/album=586301487/size=large/bgcol=333333/linkcol=ffffff/minimal=true/transparent=true/" seamless>
            <a href="https://viktorsandstrm.bandcamp.com/album/2020-2021">
              2020/2021 by Viktor Sandström
            </a>
          </iframe>
          {/* {videos} */}
        </div>
      </>
    )
  }
}
