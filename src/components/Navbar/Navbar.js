import React, {useEffect} from 'react';
import {useTheme} from '../../contexts/ThemeContext';
import './Navbar.style.css';
import Range from '../Range/Range';
import {useStateContext} from '../../contexts/StateContext';
import {bubbleSort, mergeSort} from '../../Utils/SortFunctions';
import {generateNewArray, updateColumns} from '../../Utils/SortFunctions';

function Navbar() {
  const {toggleTheme} = useTheme();

  const {state, dispatch} = useStateContext();
  const handleChangeColWidth = (e) => {
    dispatch({
      type: 'CHANGE_COLUMN_WIDTH',
      payload: {colWidth: 300 - e.target.value},
    });
  };

  const handleChangeSpeed = (e) => {
    dispatch({
      type: 'CHANGE_SPEED',
      payload: {speed: e.target.value},
    });
  };

  const handleClickAlgorithm = (selectedAlgorithm) => {
    dispatch({type: 'CHANGE_ALGORITHM', payload: {selectedAlgorithm}});
  };

  const handleClickSort = () => {
    const columns = state.chartContainerRef.current.querySelectorAll('.column');
    const columnsArray = Array.from(columns);

    if (state.selectedAlgorithm === 'bubble')
      bubbleSort(state.speed, columnsArray);
    if (state.selectedAlgorithm === 'merge')
      mergeSort(columnsArray, state.chartContainerRef, state.speed);
  };

  const handleClickGenerateNew = () => {
    const newArr = generateNewArray(state.colWidth);
    updateColumns(newArr, state.colWidth, state.chartContainerRef, dispatch);
  };

  return (
    <nav className="flex items-center gap-10 h-[70px] text-center  px-6 shadow  w-full bg-darkPrimary text-white">
      <div className="flex items-center gap-10">
        <h1 className="text-3xl font-bold">Sort Algorithms</h1>
      </div>

      <div
        onClick={handleClickGenerateNew}
        className="px-2 flex items-center gap-8"
      >
        <div className={`nav-item  py-2 border border-primary rounded-lg`}>
          <div>Generate new array</div>
        </div>

        <div>
          <Range
            handleChange={handleChangeColWidth}
            defaultValue={state.colWidth}
            step={20}
            min={10}
            max={300}
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

      <Seperator />

      <div
        onClick={() => handleClickAlgorithm('bubble')}
        className={`nav-item ${
          state.selectedAlgorithm === 'bubble' ? 'selected' : ''
        }`}
      >
        <div>Bubble Sort</div>
      </div>

      <div
        onClick={() => handleClickAlgorithm('merge')}
        className={`nav-item ${
          state.selectedAlgorithm === 'merge' ? 'selected' : ''
        }`}
      >
        <div>Merge Sort</div>
      </div>

      <Seperator />

      <div onClick={handleClickSort} className="nav-item ">
        <button
          className={`border border-primary py-2 px-4 rounded-lg bg-primary hover:text-black tracking-wider`}
        >
          Sort!
        </button>
      </div>

      {/*<div>
        <button className="btn" onClick={toggleTheme}>
          change theme
        </button>
      </div>*/}
    </nav>
  );
}

const Seperator = () => {
  return <div className="seperator w-[1px] h-full border border-primary"></div>;
};

export default Navbar;
