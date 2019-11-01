import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="bg-image" id="bg">
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
