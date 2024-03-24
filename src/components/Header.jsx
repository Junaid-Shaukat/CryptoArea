import React from "react";
import { Link } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";
import "../styles/Header.css";

const Header = () => {
  return (
    <div className="navbar">
      <div className="logo">
       <a href="/"> <h1>CryptoArea</h1></a>
        <FaEthereum color="orange" size={30}/>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/coins">Coins</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
