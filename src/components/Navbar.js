import React, {useEffect} from 'react';
import {useTheme} from '../contexts/ThemeContext';

function Navbar() {
  const {toggleTheme} = useTheme();
  return (
    <nav className="flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 shadow sm:items-baseline w-full bg-light dark:bg-secondary">
      <div>
        <div>Sort Algorithms</div>
        <button className="btn" onClick={toggleTheme}>
          click
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
