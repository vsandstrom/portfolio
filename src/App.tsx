import { Routes, Route } from 'react-router-dom';
import 'react-router';
import './App.css'

import Home from './views/home'
import Portfolio from './views/portfolio'
import Contact from './views/contact'
import Gyro from './views/gyro'
import Header from './components/header';

const App = () =>  {
  return (
    <>
      <header>
        <Header />
      </header>
      <div className="App">
        <Routes>
          <Route path='/' element={
            <Home />
          }/>
          <Route path='/portfolio' element={ 
            <Portfolio />
          }/>
          <Route path='/contact' element={
            <Contact />
          }/>
          {window.innerWidth < 800 &&
          <Route path='/gyro' element={
            <Gyro />
          }/>}
        </Routes>
      </div>
    </>
  )
}

export default App;
