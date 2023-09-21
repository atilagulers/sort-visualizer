import React, {useEffect, useRef} from 'react';
import './Main.style.css';
import {useStateContext} from '../../contexts/StateContext';
import {generateNewArray, updateColumns} from '../../Utils/SortFunctions';

function Main() {
  const chartContainerRef = useRef(null);
  const {state, dispatch} = useStateContext();

  useEffect(() => {
    const newArr = generateNewArray(state.colWidth);
    updateColumns(newArr, state.colWidth, chartContainerRef, dispatch);
  }, [state.colWidth, dispatch]);

  return (
    <div className="main h-screen w-screen flex justify-center items-center">
      <div className="chart w-full" ref={chartContainerRef}></div>
    </div>
  );
}

export default Main;
