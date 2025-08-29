import './App.css';
import Navbar from './components/Navbar.jsx';
import Homepage from './components/Homepage.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar></Navbar>
        <Homepage></Homepage>
      </header>
      
    </div>
  );
}

export default App;
