import React, {useEffect} from 'react';
import {useTheme} from '../../contexts/ThemeContext';
import './Navbar.style.css';

function Navbar() {
  const {toggleTheme} = useTheme();
  return (
    <nav className="flex items-center gap-10 h-20 text-center  px-6 shadow  w-full bg-light dark:bg-secondary">
      <div className="flex items-center gap-10">
        <h1 className="text-3xl font-bold">Sort Algorithms</h1>
      </div>

      <div>
        <div className="nav-item">here</div>
        <div className="nav-item__dropdown">
          <ul className="flex flex-col gap-3">
            <li>here 1</li>
            <li>here 1</li>
            <li>here 1</li>
            <li>here 1</li>
          </ul>
        </div>
      </div>

      <div className="nav-item">here 2</div>
      <div className="nav-item">here 3</div>

      <div>
        <button className="btn" onClick={toggleTheme}>
          click
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
