import logo from "../assets/showboxd_logo.png";
import "./Navbar.css";

export default function Navbar(props) {
  
  return (
    <div class="nav flex-center space-between">
      <div class="flex-center">
        <img src={logo} alt="showboxd logo" class="logo"/>
        <h2>Showboxd</h2>
      </div>
      <ul class="inline flex-center">
        <li><p>SIGN IN</p></li>
        <li><p>CREATE ACCOUNT</p></li>
        <li><p>SHOWS</p></li>
        <li><p>MEMBERS</p></li>
        <li><p>JOURNALS</p></li>
        <li><p>SEARCH</p></li>
      </ul>
    </div>
  );
}

