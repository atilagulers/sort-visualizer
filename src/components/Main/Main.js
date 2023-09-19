import React, {useEffect, useRef, useState} from 'react';
import './Main.style.css';
import {getTextSize} from '../../Utils/Helpers';
import {useStateContext} from '../../contexts/StateContext';
import {delay} from '../../Utils/Helpers';
import {bubbleSort, swapColumns} from '../../Utils/SortFunctions';

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

  async function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return new Promise(async (resolve) => {
      const sortedArr = await merge(
        await mergeSort(left),
        await mergeSort(right)
      );
      resolve(sortedArr);
    });
  }

  async function merge(leftArr, rightArr) {
    const sortedArr = [];

    while (leftArr.length && rightArr.length) {
      const leftCol = leftArr[0];
      const rightCol = rightArr[0];

      leftCol.classList.add('bg-green-400');
      rightCol.classList.add('bg-green-400');

      const leftNum = parseInt(leftCol.getAttribute('data-number'));
      const rightNum = parseInt(rightCol.getAttribute('data-number'));
      await delay(0.01);

      if (leftNum <= rightNum) {
        //swapColumns(rightCol, leftCol);
        sortedArr.push(leftArr.shift());
      } else {
        swapColumns(leftCol, rightCol);
        sortedArr.push(rightArr.shift());
      }
      console.log(sortedArr.length);
      leftCol.classList.remove('bg-green-400');
      rightCol.classList.remove('bg-green-400');
    }
    console.log(
      [...sortedArr, ...leftArr, ...rightArr].map((el) =>
        el.getAttribute('data-number')
      )
    );

    return [...sortedArr, ...leftArr, ...rightArr];
  }

  async function handleClickSort() {
    const myArr = arr.slice();
    const columns = chartContainerRef.current.querySelectorAll('.column');
    const columnsArray = Array.from(columns);
    //console.log(columnsArray[0].getAttribute('data-number'));

    const sorted = await mergeSort(columnsArray);
    for (let i = 0; i < sorted.length; i++) {
      console.log(sorted[i].getAttribute('data-number'));
    }
    //bubbleSort(state.speed, columns);
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
