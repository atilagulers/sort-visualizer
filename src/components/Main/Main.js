import React, {useEffect, useRef, useState} from 'react';
import './Main.style.css';
import {getTextSize} from '../../Utils/Helpers';
import {useStateContext} from '../../contexts/StateContext';
import {generateNewArray, updateColumns} from '../../Utils/SortFunctions';

function Main() {
  const chartContainerRef = useRef(null);
  const {state, dispatch} = useStateContext();
  const [arr, setArr] = useState([]);

  useEffect(() => {
    //function updateColumns(arr) {
    //  const container = chartContainerRef.current;
    //  container.innerHTML = '';
    //  for (let i = 0; i < arr.length; i++) {
    //    const num = arr[i];
    //    const column = document.createElement('div');
    //    column.className =
    //      'column flex flex-col justify-end mx-[1px] bg-lightPrimary';
    //    column.style.width = state.colWidth + 'px'; // 30px - 100px
    //    column.style.height = num + '%';

    //    column.dataset.number = num;
    //    column.dataset.index = i;

    //    const numText = document.createElement('div');
    //    numText.className = `text-center -rotate-90 mb-2 ${getTextSize(
    //      state.colWidth
    //    )}`;
    //    numText.textContent = num;

    //    column.appendChild(numText);
    //    container.appendChild(column);

    //    dispatch({type: 'SET_CHART_CONTAINER', payload: {chartContainerRef}});
    //  }
    //}

    const newArr = generateNewArray(state.colWidth);
    updateColumns(newArr, state.colWidth, chartContainerRef, dispatch);
  }, [state.colWidth, dispatch]);

  return (
    <div className="main">
      <div className="chart flex" ref={chartContainerRef}></div>
    </div>
  );
}

export default Main;
