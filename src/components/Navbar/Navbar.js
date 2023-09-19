import React, {useEffect} from 'react';
import {useTheme} from '../../contexts/ThemeContext';
import './Navbar.style.css';
import Range from '../Range/Range';
import {useStateContext} from '../../contexts/StateContext';

function Navbar() {
  const {toggleTheme} = useTheme();

  const {state, dispatch} = useStateContext();
  const handleChangeColWidth = (e) => {
    dispatch({
      type: 'CHANGE_COLUMN_WIDTH',
      payload: {colWidth: e.target.value},
    });
  };

  const handleChangeSpeed = (e) => {
    dispatch({
      type: 'CHANGE_SPEED',
      payload: {speed: e.target.value},
    });
  };

  return (
    <nav className="flex items-center gap-10 h-20 text-center  px-6 shadow  w-full bg-light dark:bg-secondary">
      <div className="flex items-center gap-10">
        <h1 className="text-3xl font-bold">Sort Algorithms</h1>
      </div>

      <div className="px-2 h-full flex items-center">
        <div>
          <Range
            handleChange={handleChangeColWidth}
            defaultValue={state.colWidth}
            step={10}
            min={10}
            max={100}
            label={'count'}
          />
        </div>
        <div>
          <Range
            handleChange={handleChangeSpeed}
            defaultValue={state.speed}
            step={0.1}
            min={0.1}
            max={1}
            label={'speed'}
          />
        </div>
      </div>

      <div className="seperator w-[1px] h-full border"></div>

      <div className="border-r-2 border-r-indigo-400"> </div>

      <div className="nav-item">
        <div>here 3</div>
      </div>

      <div>
        <button className="btn" onClick={toggleTheme}>
          click
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
