import React, {useEffect} from 'react';
import {useTheme} from '../../contexts/ThemeContext';
import './Navbar.style.css';
import Range from '../Range/Range';
import {useStateContext} from '../../contexts/StateContext';
import {bubbleSort, mergeSort, swapColumns} from '../../Utils/SortFunctions';
import {generateNewArray, updateColumns} from '../../Utils/SortFunctions';
import {delay} from '../../Utils/Helpers';

function Navbar() {
  //const {toggleTheme} = useTheme();

  const {state, dispatch} = useStateContext();

  const handleChangeColWidth = (e) => {
    e.preventDefault();
    dispatch({
      type: 'CHANGE_COLUMN_WIDTH',
      payload: {colWidth: e.target.value},
    });
  };

  const handleChangeSpeed = (e) => {
    e.preventDefault();
    dispatch({
      type: 'CHANGE_SPEED',
      payload: {speed: e.target.value},
    });
  };

  const handleClickAlgorithm = (selectedAlgorithm) => {
    if (state.isSorting) return;
    dispatch({type: 'CHANGE_ALGORITHM', payload: {selectedAlgorithm}});
  };

  const enableNavItemsCb = () => {
    dispatch({type: 'SET_IS_SORTING', payload: {isSorting: false}});
  };

  const handleClickSort = () => {
    const columns = state.chartContainerRef.current.querySelectorAll('.column');
    const columnsArray = Array.from(columns);

    dispatch({type: 'SET_IS_SORTING', payload: {isSorting: true}});

    if (state.selectedAlgorithm === 'selection')
      selectionSort(
        columnsArray,
        state.speed,
        state.chartContainerRef,
        enableNavItemsCb
      );

    if (state.selectedAlgorithm === 'bubble')
      bubbleSort(state.speed, columnsArray, enableNavItemsCb);
    if (state.selectedAlgorithm === 'merge')
      mergeSort(
        columnsArray,
        state.chartContainerRef,
        state.speed,
        enableNavItemsCb
      );
  };

  const selectionSort = async (arr, speed, chartContainerRef, cb) => {
    let length = arr.length;
    const greenColor = 'bg-green-400';

    for (let i = 0; i < length; i++) {
      let minIndex = i;

      arr[i].classList.add(greenColor);
      arr[i].classList.remove('bg-lightPrimary');

      for (let j = i + 1; j < length; j++) {
        const minNum = parseInt(arr[minIndex].getAttribute('data-number'));
        const targetNum = parseInt(arr[j].getAttribute('data-number'));

        if (targetNum < minNum) {
          minIndex = j;
        }

        arr[j].classList.add('bg-red-400');
        arr[j].classList.remove('bg-lightPrimary');
        await delay(1 - speed);

        arr[j].classList.remove('bg-red-400');
        arr[j].classList.add('bg-lightPrimary');
      }

      arr[i].classList.remove(greenColor);
      arr[i].classList.add('bg-lightPrimary');

      if (minIndex !== i) {
      }
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;

      chartContainerRef.current.insertBefore(
        arr[i],
        chartContainerRef.current.children[i]
      );
      chartContainerRef.current.insertBefore(
        arr[minIndex],
        chartContainerRef.current.children[minIndex]
      );

      const allCols = document.querySelectorAll('.column');
      for (let k = 0; k < allCols.length; k++) {
        allCols[k].setAttribute('data-index', k);
      }
    }
    cb();
    return arr;
  };

  const handleClickGenerateNew = () => {
    enableNavItemsCb();
    const newArr = generateNewArray(state.colWidth);
    updateColumns(newArr, state.colWidth, state.chartContainerRef, dispatch);
  };

  return (
    <nav className="flex items-center gap-10 h-[70px] text-center  px-6 shadow  w-full bg-darkPrimary text-white">
      <div className="flex items-center gap-10">
        <h1 className="text-3xl font-bold">Sort Algorithms</h1>
      </div>

      <div className="px-2 flex items-center gap-8">
        <div className={`nav-item  py-2 border border-primary rounded-lg`}>
          <div onClick={handleClickGenerateNew}>Generate new array</div>
        </div>
        <div>
          <Range
            handleChange={handleChangeColWidth}
            defaultValue={state.colWidth}
            step={20}
            min={10}
            max={300}
            label={'column size'}
            disabled={state.isSorting}
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
            disabled={state.isSorting}
          />
        </div>
      </div>

      <Seperator />

      <div
        onClick={() => handleClickAlgorithm('selection')}
        className={`nav-item ${
          state.selectedAlgorithm === 'selection' ? 'selected' : ''
        }`}
        disabled={state.isSorting}
      >
        <div>Selection Sort</div>
      </div>

      <div
        onClick={() => handleClickAlgorithm('bubble')}
        className={`nav-item ${
          state.selectedAlgorithm === 'bubble' ? 'selected' : ''
        }`}
        disabled={state.isSorting}
      >
        <div>Bubble Sort</div>
      </div>

      <div
        onClick={() => handleClickAlgorithm('merge')}
        className={`nav-item ${
          state.selectedAlgorithm === 'merge' ? 'selected' : ''
        }`}
        disabled={state.isSorting}
      >
        <div>Merge Sort</div>
      </div>

      <Seperator />

      <div
        onClick={handleClickSort}
        className="nav-item disabled:hover:text-white"
      >
        <button
          className={`border border-primary py-2 px-4 rounded-lg bg-primary hover:text-black tracking-wider disabled:bg-secondary `}
          disabled={state.isSorting}
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
