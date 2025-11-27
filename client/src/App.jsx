import { useState, useEffect } from 'react'
import Homepage from './components/Homepage.jsx';
import Navbar from './components/Navbar.jsx';
import './App.css'

function App() {
  const [shows, setShows] = useState([]);
  
    useEffect(() => {
      const fetchShows = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/v1/shows/");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);          // debug log
          setShows(data);
        } catch (err) {
          console.error("Error fetching shows:", err);
          setError(err.message);
        }
      };
  
      fetchShows();
    }, []);

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
