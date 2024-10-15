import React from 'react'
import { Link } from 'react-router-dom' 


const Navbar = () => {
  
  
    return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <h2>Logo</h2>
      </Link>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
