import { useState } from 'react'
import Homepage from './components/Homepage.jsx';
import Navbar from './components/Navbar.jsx';
import './App.css'

function App() {

  return (
    <div className="App">
        <header className="App-header">
          <Navbar></Navbar>
          <Homepage></Homepage>
        </header>
    </div>
  )
}

export default App
