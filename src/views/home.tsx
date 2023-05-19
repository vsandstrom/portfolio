import { Component, ReactNode } from 'react'
const FrontPage = (): JSX.Element => {


  return (
    <>
      {/* <br/><br/><br/> */}
      <br/><br/><br/>
      <div id="frontpage">
        <div id="title">
          <div>
            <h1>COMPOSER</h1>
            <h1>SOUND DESIGNER</h1>
            <h1>MUSICIAN</h1>
            <h1>PROGRAMMER</h1>
          </div>
          {window.innerWidth > 1300 && 
          <iframe className='bandcamp' src= "https://bandcamp.com/EmbeddedPlayer/album=586301487/size=medium/bgcol=333333/linkcol=ffffff/minimal=true/transparent=true/" seamless>
            <a href="https://viktorsandstrm.bandcamp.com/album/2020-2021">
              2020/2021 by Viktor Sandström
            </a>
          </iframe>
          }
          {window.innerWidth <= 1300 &&
          <iframe className='bandcamp' src= "https://bandcamp.com/EmbeddedPlayer/album=586301487/size=large/bgcol=333333/linkcol=ffffff/minimal=true/transparent=true/" seamless>
            <a href="https://viktorsandstrm.bandcamp.com/album/2020-2021">
              2020/2021 by Viktor Sandström
            </a>
          </iframe>


          }

        </div>
        {/* <div className='frontItem'> */}
        {/*   <div id='bio'> */}
        {/*     Utbildad vid Kungliga Musikhögskolan, Fridhem Folkhögsskola, Högskolan för Scen */}
        {/*     och Musik samt Billströmska Folkhögsskola. Han är verksam som kompositör inom */}
        {/*     elektroakustisk musik, skriver musik för teater och film.  */}
        {/*   </div> */}
        {/* </div> */}
        {window.innerWidth >=1300 &&
          <div className='frontItem'>
            <img src='cvbild.jpg' />
          </div>
        }
      </div>

    </> 
  )
}

export default class Home extends Component {
  render(): ReactNode {
    return (
      <>
      <header>
        {/* <Header /> */}
      </header>
      <main>
      <FrontPage />
      </main>
      </>
    )
  }
}

