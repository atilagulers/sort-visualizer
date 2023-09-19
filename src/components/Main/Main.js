import React, {useEffect, useRef, useState} from 'react';
import './Main.style.css';
import {getTextSize} from '../../Utils/Helpers';
import {useStateContext} from '../../contexts/StateContext';
import {bubbleSort, mergeSort} from '../../Utils/SortFunctions';

function Main() {
  const chartContainerRef = useRef(null);
  const {state} = useStateContext();
  const [arr, setArr] = useState([]);

  useEffect(() => {
    function updateColumns(arr) {
      const container = chartContainerRef.current;
      container.innerHTML = '';
      for (let i = 0; i < arr.length; i++) {
        const num = arr[i];
        const column = document.createElement('div');
        column.className = 'column flex flex-col justify-end mx-[1px] bg-light';
        column.style.width = state.colWidth + 'px'; // 30px - 100px
        column.style.height = num + '%';

        column.dataset.number = num;
        column.dataset.index = i;

        const numText = document.createElement('div');
        numText.className = `text-center -rotate-90 mb-2 ${getTextSize(
          state.colWidth
        )}`;
        numText.textContent = num;

        column.appendChild(numText);
        container.appendChild(column);
      }
    }

    const newArr = new Array(Math.round(1200 / state.colWidth)); // chart width / col width
    for (let i = 0; i < newArr.length; i++) {
      newArr[i] = Math.round(Math.random() * 95) + 5;
    }
    setArr(newArr);
    updateColumns(newArr);
  }, [state.colWidth]);

  function handleClickSort() {
    const columns = chartContainerRef.current.querySelectorAll('.column');
    const columnsArray = Array.from(columns);
    //bubbleSort(state.speed, columnsArray);
    mergeSort(columnsArray, chartContainerRef, state.speed);
  }

  return (
    <div className="main">
      <button onClick={handleClickSort} className="bg-white">
        sort
      </button>
      <div className="chart flex" ref={chartContainerRef}></div>
    </div>
  );
}

export default Main;
