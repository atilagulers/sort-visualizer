import React, {useEffect} from 'react';
import {useTheme} from '../contexts/ThemeContext';

function Navbar() {
  const {toggleTheme} = useTheme();
  return (
    <div className="h-14 bg-red-400 dark:bg-purple-400">
      <button onClick={toggleTheme}>click</button>
    </div>
  );
}

export default Navbar;
